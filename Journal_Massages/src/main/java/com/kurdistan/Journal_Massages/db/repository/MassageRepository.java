package com.kurdistan.Journal_Massages.db.repository;

import com.kurdistan.Journal_Massages.db.entity.MassageDb;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MassageRepository extends JpaRepository<MassageDb, Long> {
    MassageDb getMassageDbById(long id);
    List<MassageDb> getMassageDbsByReceiverId (long id);

    List<MassageDb> getMassageDbsBySenderId (long id);
}
