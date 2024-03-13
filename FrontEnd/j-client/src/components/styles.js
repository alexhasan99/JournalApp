// styles.js
export const styles = {
    container: {
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
    },
    messageList: {
      listStyleType: 'none',
      padding: 0,
    },
    messageItem: {
      background: '#f9f9f9',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '5px',
    },
    input: {
      padding: '10px',
      margin: '10px 0',
      borderRadius: '5px',
      border: '1px solid #ccc',
      width: 'calc(100% - 22px)',
    },
    button: {
      background: '#007bff',
      color: 'white',
      padding: '10px 15px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    searchSection: {
      marginTop: '20px',
    },
    linkButton: {
      textDecoration: 'none',
      background: '#28a745',
      color: 'white',
      padding: '10px 15px',
      borderRadius: '5px',
      display: 'inline-block',
      marginLeft: '10px',
    }
  };
  

// Använd dessa stilar i din komponent med style-attributet, till exempel:
// <div style={styles.container}>...</div>

// För Link-komponenten kan du lägga till styling så här:
// <Link to={`/staff/selectedPatient/${patient.id}`} style={styles.linkButton}>Select Patient</Link>
