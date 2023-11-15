package kurdistan.journalapp.service.interfaces;


import kurdistan.journalapp.model.Staff;

import java.util.List;


public interface IStaffService {

    Staff getStaffById(Long id);

    Staff createStaff(Staff staff);

    Staff updateStaff(Long id, Staff staff);

    void deleteStaff(Long id);

    List<Staff> getAllStaff();

}
