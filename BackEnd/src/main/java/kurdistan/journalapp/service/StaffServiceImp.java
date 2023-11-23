package src.main.java.kurdistan.journalapp.service;

import src.main.java.kurdistan.journalapp.db.model.StaffDb;
import src.main.java.kurdistan.journalapp.db.model.UserDb;
import src.main.java.kurdistan.journalapp.db.repository.StaffRepository;
import src.main.java.kurdistan.journalapp.db.repository.UserRepository;
import src.main.java.kurdistan.journalapp.service.interfaces.IStaffService;
import src.main.java.kurdistan.journalapp.model.Staff;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StaffServiceImp implements IStaffService {


    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private UserRepository userRepository;



    @Override
    public Staff getStaffById(Long id) {
        return Staff.FromStaffDb(staffRepository.getDoctorDbById(id));
    }

    @Override
    public Staff createStaff(Staff staff) {
        UserDb u = userRepository.save(UserDb.FromUser(staff.getUser()));
        staff.getUser().setId(u.getId());
        Staff d = Staff.FromStaffDb(staffRepository.save(StaffDb.FromStaff(staff)));
        return d;
    }

    @Override
    public Staff updateStaff(Long id, Staff updatedStaff) {
        StaffDb existingDoctor = staffRepository.getDoctorDbById(id);

        if (existingDoctor != null) {
            List<String> changedAttributes = Staff.FromStaffDb(existingDoctor).getChangedAttributes(updatedStaff);

            for (String attribute : changedAttributes) {
                switch (attribute) {
                    case "firstName" -> existingDoctor.setFirstName(updatedStaff.getFirstName());
                    case "lastName" -> existingDoctor.setLastName(updatedStaff.getLastName());
                    case "email" -> existingDoctor.setEmail(updatedStaff.getEmail());
                    case "staffType" -> existingDoctor.setStaffType(updatedStaff.getStaffType());
                    case "gender" -> existingDoctor.setGender(updatedStaff.getGender());
                    default -> {
                    }
                    // Om attributet inte matchar något av fallen
                }
            }

            StaffDb updatedStaffDb = staffRepository.save(existingDoctor);
            return Staff.FromStaffDb(updatedStaffDb);
        }
        return null;
    }


    @Override
    public void deleteStaff(Long id) {
        StaffDb d = staffRepository.findDoctorDbById(id);
        userRepository.deleteById(d.getUserDb().getId());
    }

    @Override
    public List<Staff> getAllStaff() {
        List<Staff> staff = new ArrayList<>();
        for (StaffDb d: staffRepository.findAll()) {
            staff.add(Staff.FromStaffDb(d));
        }
        return staff;
    }
}
