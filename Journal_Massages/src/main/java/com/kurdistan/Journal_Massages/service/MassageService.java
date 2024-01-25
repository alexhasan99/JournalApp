package com.kurdistan.Journal_Massages.service;

import com.kurdistan.Journal_Massages.db.entity.MassageDb;
import com.kurdistan.Journal_Massages.db.repository.MassageRepository;
import com.kurdistan.Journal_Massages.model.Massage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MassageService implements IMassageService {

    @Autowired
    private MassageRepository massageRepository;


    @Override
    public Massage getMassageById(Long id) {
        return Massage.fromMassageDb(massageRepository.getMassageDbById(id));
    }

    @Override
    public Massage createMassage(Massage massage) {
        massageRepository.save(MassageDb.fromMassage(massage));
        return massage;
    }

    @Override
    public Massage updateMassage(Long id, Massage massage) {
        return null;
    }

    @Override
    public List<Massage> getMassageByReceiverId(Long id) {
        List <Massage> massages = new ArrayList<>();
        for (MassageDb m: massageRepository.getMassageDbsByReceiverId(id)
             ) {
            massages.add(Massage.fromMassageDb(m));
        }
        return massages;
    }

    @Override
    public List<Massage> getMassageBySenderId(Long id) {
        List <Massage> massages = new ArrayList<>();
        for (MassageDb m: massageRepository.getMassageDbsBySenderId(id)
        ) {
            massages.add(Massage.fromMassageDb(m));
        }
        return massages;
    }

}
