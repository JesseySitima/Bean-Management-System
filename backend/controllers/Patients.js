import Patients from "../models/PatientModel.js";

export const getPatients = async (req, res) => {
    try {
        const patients = await Patients.findAll({
            attributes: ['id', 'firstName', 'lastName', 'middleName', 'gender', 'dateOfBirth', 'phoneNumber', 'address', 'createdAt'],
            order: [['createdAt', 'DESC']],
        });
        res.json(patients);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
};

export const getRecentPatients = async (req, res) => {
    try {
        // Fetch recent patients based on createdAt timestamp in descending order (assuming createdAt field exists)
        const recentPatients = await Patients.findAll({
            attributes: ['id', 'firstName', 'lastName', 'gender'], // Include necessary attributes
            order: [['createdAt', 'DESC']], // Order by createdAt in descending order to get recent patients first
            limit: 3 // Limit the result to 10 recent patients, adjust as needed
        });

        res.json(recentPatients);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
};



export const countPatients = async (req, res) => {
    try {
        const patientsCount = await Patients.count(); // Get the total count of patients
        res.json({ patientsCount }); // Send the count as a response
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
};

export const createPatient = async (req, res) => {
    const { firstName, lastName, gender, dateOfBirth, phoneNumber, address, middleName } = req.body;

    try {
        const newPatient = await Patients.create({
            firstName,
            lastName,
            gender,
            dateOfBirth,
            phoneNumber,
            address,
            middleName
        });

        res.status(201).json({ msg: "Patient created successfully", patient: newPatient });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Failed to create patient" });
    }
};

export const getPatientById = async (req, res) => {
    const { id } = req.params;

    try {
        const patient = await Patients.findByPk(id);
        if (!patient) {
            return res.status(404).json({ msg: "Patient not found" });
        }
        res.json(patient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
    }
};

export const updatePatient = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, gender, dateOfBirth, phoneNumber, address } = req.body;

    try {
        const patient = await Patients.findByPk(id);
        if (!patient) {
            return res.status(404).json({ msg: "Patient not found" });
        }

        // Update patient information
        await Patients.update(
            {
                firstName,
                lastName,
                gender,
                dateOfBirth,
                phoneNumber,
                address
            },
            {
                where: { id }
            }
        );

        res.json({ msg: "Patient updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Failed to update patient" });
    }
};

export const deletePatient = async (req, res) => {
    const { id } = req.params;

    try {
        const patient = await Patients.findByPk(id);
        if (!patient) {
            return res.status(404).json({ msg: "Patient not found" });
        }

        await Patients.destroy({
            where: { id }
        });

        res.json({ msg: "Patient deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Failed to delete patient" });
    }
};
