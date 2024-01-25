package com.kurdistan.Journal_Massages.service;

import com.kurdistan.Journal_Massages.model.Massage;

import java.util.List;

public interface IMassageService {
    Massage getMassageById(Long id);

    Massage createMassage(Massage massage);

    Massage updateMassage(Long id, Massage massage);

    List<Massage> getMassageByReceiverId(Long id);

    List<Massage> getMassageBySenderId(Long id);
}
