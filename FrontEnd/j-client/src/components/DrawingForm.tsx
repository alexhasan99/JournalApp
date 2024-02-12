
import React, { useState, useRef, useEffect  } from 'react';
import ApiService from "../services/ApiServices";
import {ImageCreation, ImageDetails} from "../interface/interface"; // Assuming createImage function exists



const DrawingForm: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [text, setText] = useState(''); // State for text input
    const [textPosition, setTextPosition] = useState({ x: 100, y: 100 }); // Initial position
    const [isDrawing, setIsDrawing] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [path, setPath] = useState<Point[]>([]);
    const [undoStack, setUndoStack] = useState<Point[][]>([]);
    const [redoStack, setRedoStack] = useState<Point[][]>([]);
    const [selectedImageId, setSelectedImageId] = useState<number | null>(null);


    interface Point {
        x: number;
        y: number;
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = 600;  // Set the desired width
            canvas.height = 500; // Set the desired height
            canvas.style.width = '600px';  // Set the desired width
            canvas.style.height = '500px'; // Set the desired height

            const context = canvas.getContext('2d');
            if (context) {

                context.lineCap = 'round';
                context.strokeStyle = 'black';
                context.lineWidth = 5;
                contextRef.current = context;
            }
        }

    },[])

    const startDrawing = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current?.beginPath();
        contextRef.current?.moveTo(offsetX, offsetY);
        setIsDrawing(true);
        setPath([{ x: offsetX, y: offsetY }]);
    };

    const finishDrawing = () => {
        if (isDrawing) {
            setUndoStack([...undoStack, path]);
            setRedoStack([]);
        }
        setIsDrawing(false);
    };

    const draw = ({nativeEvent} : React.MouseEvent<HTMLCanvasElement>) => {
        if(!isDrawing) {
            return
        }
        if(contextRef.current){
            const {offsetX, offsetY} = nativeEvent;
            contextRef.current.lineTo(offsetX, offsetY)
            contextRef.current.stroke()
        }

    }

    const redrawCanvas = (paths: Point[][]) => {
        contextRef.current?.clearRect(0, 0, 600, 500);

        paths.forEach((path, index) => {
            if (index < paths.length - 1) {
                contextRef.current?.beginPath();
                contextRef.current?.moveTo(path[0].x, path[0].y);
                path.forEach(({ x, y }) => {
                    contextRef.current?.lineTo(x, y);
                    contextRef.current?.stroke();
                });
            }
        });
    };

    const clearAll = () => {
        contextRef.current?.clearRect(0, 0, 600, 500);
        setUndoStack([]);
        setRedoStack([]);
    };


    const handleSelectImage = async (imageId: number) => {
        setSelectedImageId(imageId);

        try {
            const imageDetails = await ApiService.getImageById(imageId);
            const imageData = imageDetails.imageData;

            // Use refs to draw the image onto the canvas
            if (contextRef.current) {
                const img = new Image();
                img.src = `data:image/png;base64,${imageData}`;
                img.onload = () => {
                    contextRef.current?.drawImage(img, 0, 0);
                };
            }
        } catch (error) {
            console.error('Error fetching image data:', error);
        }
    };


    const handleSave = async () => {
        try {
            if (canvasRef.current) {
                const canvas = canvasRef.current;
                const dataUrl = canvas.toDataURL('image/png');

                const imageCreationData: ImageCreation = {
                    name: name,
                    description: description,
                    imageData: dataUrl.split(',')[1], // Extract base64 part of the data URL
                };

                // Send the drawing data to the server
                await ApiService.createImage(imageCreationData);
                console.log('Image saved successfully');
            }
        } catch (error) {
            console.error('Error saving image:', error);
        }
    };

    const handleAddText = () => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                ctx.font = '32px Arial'; // Set the font size and family
                ctx.fillStyle = '#000000'; // Set the text color
                ctx.fillText(text, textPosition.x, textPosition.y);
            }
        }
    };


    return (
        <div className="drawing-form">
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Description:</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <label>Text:</label>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <label>X Position:</label>
                <input type="number" value={textPosition.x} onChange={(e) => setTextPosition({ ...textPosition, x: parseInt(e.target.value) })} />
                <label>Y Position:</label>
                <input type="number" value={textPosition.y} onChange={(e) => setTextPosition({ ...textPosition, y: parseInt(e.target.value) })} />
                <button onClick={handleAddText}>Add Text</button>
            </div>
            <div>
                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseUp={finishDrawing}
                    onMouseMove={draw}
                    style={{ border: '1px solid black', marginLeft: "30px", marginTop: "10px"}}
                />
            </div>
            <div>
                <button onClick={handleSave}>Save Image</button>
            </div>
            <div>

                <button onClick={clearAll}>Clear All</button>
            </div>
            <h4>List of Images (info)</h4>
            <ImageList onSelectImage={handleSelectImage}></ImageList>
        </div>
    );
};


export default DrawingForm;


export const ImageViewer: React.FC<{ imageId: number }> = ({ imageId }) => {
    const [imageData, setImageData] = useState(null);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const fetchImageData = async () => {
            try {
                const imageDetails = await ApiService.getImageById(imageId);
                console.log('Received image details:', imageDetails);

                // Assuming the structure is { name: 'Test', id: 1, description: 'Test', imageData: 'base64-encoded-data' }
                const imageData = imageDetails.imageData;

                setImageData(imageData);
            } catch (error) {
                console.error('Error fetching image data:', error);
            }
        };

        fetchImageData();
    }, [imageId]);
    const EditForm: React.FC<{ imageDetails: ImageCreation; onSubmit: (details: ImageCreation, file: File | null) => void;
        onCancel: () => void }> = ({ imageDetails, onSubmit, onCancel }) => {
        const [name, setName] = useState(imageDetails.name);
        const [description, setDescription] = useState(imageDetails.description);
        const [selectedFile, setSelectedFile] = useState<File | null>(null);

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            // Perform validation if needed

            // Call onSubmit with updated details
            onSubmit({name, description, imageData: imageDetails.imageData}, selectedFile);
        };

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files && e.target.files[0];
            setSelectedFile(file);
        };

        return (
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>

                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}/>

                <label>Image:</label>
                <input type="file" accept="image/*" onChange={handleFileChange} />

                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        );
    };

    const handleEditSubmit = async (updatedDetails: ImageCreation) => {
        try {
            // Make API call to update image details
            await ApiService.updateImageById(imageId, updatedDetails);

            // Refresh the image details after the update
            const updatedImageDetails = await ApiService.getImageById(imageId);
            setImageData(updatedImageDetails);

            // Exit the edit mode
            setEditMode(false);
        } catch (error) {
            console.error('Error updating image details:', error);
        }
    };


    return (
        <div>
            {editMode && imageData !== null ? (
                // Render the edit form
                <EditForm
                    imageDetails={imageData}
                    onSubmit={(updatedDetails) => handleEditSubmit(updatedDetails)}
                    onCancel={() => setEditMode(false)}
                />
            ) : (
                // Render the image
                <div>

                </div>
            )}
        </div>
    );
}



export const ImageList: React.FC<{ onSelectImage: (imageId: number) => void }> = ({ onSelectImage }) => {
    const [images, setImages] = useState([]);
    const [selectedImageId, setSelectedImageId] = useState<number | null>(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const imageData = await ApiService.getAllImages();
                setImages(imageData);
            } catch (error) {
                console.error('Error fetching image data:', error);
            }
        };

        fetchImages();
    }, []);

    const handleSelectImage = (imageId: number) => {
        onSelectImage(imageId)
        setSelectedImageId(imageId);
    };

    return (
        <div>
            <ul>
                {images.map((image: any) => (
                    <li key={image.id}>
                        <div>ID: {image.id}</div>
                        <div>Name: {image.name}</div>
                        <div>Description: {image.description}</div>
                        <button onClick={() => handleSelectImage(image.id)}>Select Image</button>
                    </li>
                ))}
            </ul>
            {selectedImageId && <ImageViewer imageId={selectedImageId} />}
        </div>
    );
};




