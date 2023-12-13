import Appointments from "../models/AppointmentModel.js";

export const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointments.findAll({
            attributes: ['id', 'patientId', 'doctorId', 'appointmentDateTime', 'status', 'reason', 'notes']
        });
        res.json(appointments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
};

export const createAppointment = async (req, res) => {
    const { patientId, doctorId, appointmentDateTime, status, reason, notes } = req.body;

    try {
        const newAppointment = await Appointments.create({
            patientId,
            doctorId,
            appointmentDateTime,
            status,
            reason,
            notes
        });

        res.status(201).json({ msg: "Appointment created successfully", appointment: newAppointment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Failed to create appointment" });
    }
};

export const getAppointmentById = async (req, res) => {
    const { id } = req.params;

    try {
        const appointment = await Appointments.findByPk(id);
        if (!appointment) {
            return res.status(404).json({ msg: "Appointment not found" });
        }
        res.json(appointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
    }
};

export const updateAppointment = async (req, res) => {
    const { id } = req.params;
    const { patientId, doctorId, appointmentDateTime, status, reason, notes } = req.body;

    try {
        const appointment = await Appointments.findByPk(id);
        if (!appointment) {
            return res.status(404).json({ msg: "Appointment not found" });
        }

        // Update appointment information
        await Appointments.update(
            {
                patientId,
                doctorId,
                appointmentDateTime,
                status,
                reason,
                notes
            },
            {
                where: { id }
            }
        );

        res.json({ msg: "Appointment updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Failed to update appointment" });
    }
};

export const deleteAppointment = async (req, res) => {
    const { id } = req.params;

    try {
        const appointment = await Appointments.findByPk(id);
        if (!appointment) {
            return res.status(404).json({ msg: "Appointment not found" });
        }

        await Appointments.destroy({
            where: { id }
        });

        res.json({ msg: "Appointment deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Failed to delete appointment" });
    }
};

export const getRecentAppointments = async (req, res) => {
    try {
        const recentAppointments = await Appointments.findAll({
            attributes: ['id', 'patientId', 'doctorId', 'appointmentDateTime', 'status'],
            order: [['appointmentDateTime', 'DESC']], // Order by appointmentDateTime in descending order to get recent appointments first
            limit: 5 // Limit the result to 5 recent appointments, adjust as needed
        });

        res.json(recentAppointments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
};

export const countAppointments = async (req, res) => {
    try {
        const appointmentsCount = await Appointments.count(); // Get the total count of appointments
        res.json({ appointmentsCount }); // Send the count as a response
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
};

export const countActiveAppointments = async (req, res) => {
    try {
      const activeCount = await Appointments.count({ where: { status: 'active' } });
      res.json({ activeCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server Error" });
    }
  };
  
  export const countCancelledAppointments = async (req, res) => {
    try {
      const cancelledCount = await Appointments.count({ where: { status: 'cancelled' } });
      res.json({ cancelledCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server Error" });
    }
  };
  
  export const countCompletedAppointments = async (req, res) => {
    try {
      const completedCount = await Appointments.count({ where: { status: 'completed' } });
      res.json({ completedCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server Error" });
    }
  };
  