import MedicalRecords from "../models/MedicalRecordsModel.js";

export const getMedicalRecords = async (req, res) => {
    try {
        const medicalRecords = await MedicalRecords.findAll({
            attributes: ['recordID', 'patientID', 'dateRecorded', 'diagnosisID', 'treatment', 'doctorID', 'notes', 'prescription', 'testResults'],
            order: [['dateRecorded', 'DESC']],
        });
        res.json(medicalRecords);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
};

export const createMedicalRecord = async (req, res) => {
    const {
        patientID,
        dateRecorded,
        diagnosisID,
        treatment,
        doctorID,
        notes,
        prescription,
        testResults
    } = req.body;

    try {
        const newMedicalRecord = await MedicalRecords.create({
            patientID,
            dateRecorded,
            diagnosisID,
            treatment,
            doctorID,
            notes,
            prescription,
            testResults
        });

        res.status(201).json({ msg: "Medical record created successfully", medicalRecord: newMedicalRecord });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Failed to create medical record" });
    }
};

export const getMedicalRecordById = async (req, res) => {
    const { id } = req.params;

    try {
        const medicalRecord = await MedicalRecords.findByPk(id);
        if (!medicalRecord) {
            return res.status(404).json({ msg: "Medical record not found" });
        }
        res.json(medicalRecord);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
    }
};

export const updateMedicalRecord = async (req, res) => {
    const { id } = req.params;
    const {
        patientID,
        dateRecorded,
        diagnosisID,
        treatment,
        doctorID,
        notes,
        prescription,
        testResults
    } = req.body;

    try {
        const medicalRecord = await MedicalRecords.findByPk(id);
        if (!medicalRecord) {
            return res.status(404).json({ msg: "Medical record not found" });
        }

        // Update medical record information
        await MedicalRecords.update(
            {
                patientID,
                dateRecorded,
                diagnosisID,
                treatment,
                doctorID,
                notes,
                prescription,
                testResults
            },
            {
                where: { recordID: id }
            }
        );

        res.json({ msg: "Medical record updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Failed to update medical record" });
    }
};

export const deleteMedicalRecord = async (req, res) => {
    const { id } = req.params;

    try {
        const medicalRecord = await MedicalRecords.findByPk(id);
        if (!medicalRecord) {
            return res.status(404).json({ msg: "Medical record not found" });
        }

        await MedicalRecords.destroy({
            where: { recordID: id }
        });

        res.json({ msg: "Medical record deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Failed to delete medical record" });
    }
};

export const getMedicalRecordsByPatientID = async (req, res) => {
    const { patientID } = req.params;

    try {
        const medicalRecords = await MedicalRecords.findAll({
            where: { patientID },
            attributes: ['recordID', 'patientID', 'dateRecorded', 'diagnosisID', 'treatment', 'doctorID', 'notes', 'prescription', 'testResults'],
            order: [['dateRecorded', 'DESC']],
        });
        res.json(medicalRecords);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
    }
};

