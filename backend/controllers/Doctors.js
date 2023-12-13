import Doctors from "../models/DoctorModel.js"; // Import the DoctorModel

export const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctors.findAll({
            attributes: ['doctor_id', 'doctor_name', 'specialization', 'contact_number', 'email', 'department_id']
        });
        res.json(doctors);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
};

export const getRecentDoctors = async (req, res) => {
    try {
        // Fetch recent doctors based on createdAt timestamp in descending order (assuming createdAt field exists)
        const recentDoctors = await Doctors.findAll({
            attributes: ['doctor_id', 'doctor_name', 'specialization', 'contact_number', 'email'], // Include necessary attributes
            order: [['createdAt', 'DESC']], // Order by createdAt in descending order to get recent doctors first
            limit: 3 // Limit the result to 3 recent doctors, adjust as needed
        });

        res.json(recentDoctors);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
};

export const countDoctors = async (req, res) => {
    try {
        const doctorsCount = await Doctors.count(); // Get the total count of doctors
        res.json({ doctorsCount }); // Send the count as a response
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
};

export const createDoctor = async (req, res) => {
    const { doctor_name, specialization, contact_number, email, department_id } = req.body;

    try {
        const newDoctor = await Doctors.create({
            doctor_name,
            specialization,
            contact_number,
            email,
            department_id
        });

        res.status(201).json({ msg: "Doctor created successfully", doctor: newDoctor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Failed to create doctor" });
    }
};

export const getDoctorById = async (req, res) => {
    const { doctorId } = req.params;

    try {
        const doctor = await Doctors.findByPk(doctorId);
        if (!doctor) {
            return res.status(404).json({ msg: "Doctor not found" });
        }
        res.json(doctor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
    }
};

export const updateDoctor = async (req, res) => {
    const { doctorId } = req.params;
    const { doctor_name, specialization, contact_number, email, department_id } = req.body;

    try {
        const doctor = await Doctors.findByPk(doctorId);
        if (!doctor) {
            return res.status(404).json({ msg: "Doctor not found" });
        }

        // Update doctor information
        await Doctors.update(
            {
                doctor_name,
                specialization,
                contact_number,
                email,
                department_id
            },
            {
                where: { doctor_id: doctorId }
            }
        );

        res.json({ msg: "Doctor updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Failed to update doctor" });
    }
};

export const deleteDoctor = async (req, res) => {
    const { doctorId } = req.params;

    try {
        const doctor = await Doctors.findByPk(doctorId);
        if (!doctor) {
            return res.status(404).json({ msg: "Doctor not found" });
        }

        await Doctors.destroy({
            where: { doctor_id: doctorId }
        });

        res.json({ msg: "Doctor deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Failed to delete doctor" });
    }
};
