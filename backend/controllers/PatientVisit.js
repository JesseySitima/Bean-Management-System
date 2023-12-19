import Visit from "../models/patientVisitModel.js";

export const createPatientVisit = async (req, res) => {
  const {
    patientId,
    doctorId,
    visitDate,
    consultationFee,
    labFee,
    otherFees,
    totalFee,
  } = req.body;

  try {
    const newVisit = await Visit.create({
      patientId,
      doctorId,
      visitDate,
      consultationFee,
      labFee,
      otherFees,
      totalFee,
    });

    res.status(201).json({ msg: 'Patient visit created successfully', visit: newVisit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Failed to create patient visit' });
  }
};

export const getPatientVisits = async (req, res) => {
  try {
    const patientVisits = await Visit.findAll({
      attributes: [
        'visitId',
        'patientId',
        'doctorId',
        'visitDate',
        'consultationFee',
        'labFee',
        'otherFees',
        'totalFee',
      ],
      order: [['visitDate', 'DESC']], // Assuming visitDate field exists
    });

    res.json(patientVisits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Failed to fetch patient visits' });
  }
};

// Add additional controller methods for updating, deleting, or fetching specific patient visits as needed
export const getPatientVisitById = async (req, res) => {
    const { visitId } = req.params;
  
    try {
      const patientVisit = await Visit.findByPk(visitId, {
        attributes: [
          'visitId',
          'patientId',
          'doctorId',
          'visitDate',
          'consultationFee',
          'labFee',
          'otherFees',
          'totalFee',
        ],
      });
  
      if (!patientVisit) {
        return res.status(404).json({ msg: 'Patient visit not found' });
      }
  
      res.json(patientVisit);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Failed to fetch patient visit' });
    }
  };
  
  export const updatePatientVisit = async (req, res) => {
    const { visitId } = req.params;
    const {
      patientId,
      doctorId,
      visitDate,
      consultationFee,
      labFee,
      otherFees,
      totalFee,
    } = req.body;
  
    try {
      const patientVisit = await Visit.findByPk(visitId);
  
      if (!patientVisit) {
        return res.status(404).json({ msg: 'Patient visit not found' });
      }
  
      // Update patient visit information
      await Visit.update(
        {
          patientId,
          doctorId,
          visitDate,
          consultationFee,
          labFee,
          otherFees,
          totalFee,
        },
        {
          where: { visitId },
        }
      );
  
      res.json({ msg: 'Patient visit updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Failed to update patient visit' });
    }
  };
  
  export const deletePatientVisit = async (req, res) => {
    const { visitId } = req.params;
  
    try {
      const patientVisit = await Visit.findByPk(visitId);
  
      if (!patientVisit) {
        return res.status(404).json({ msg: 'Patient visit not found' });
      }
  
      await Visit.destroy({
        where: { visitId },
      });
  
      res.json({ msg: 'Patient visit deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Failed to delete patient visit' });
    }
  };

  export const getRecentPatientVisits = async (req, res) => {
    const { limit = 10 } = req.query; // Default limit set to 10, but you can adjust it as needed
  
    try {
      const recentPatientVisits = await Visit.findAll({
        attributes: [
          'visitId',
          'patientId',
          'doctorId',
          'visitDate',
          'consultationFee',
          'labFee',
          'otherFees',
          'totalFee',
        ],
        order: [['visitDate', 'DESC']], // Assuming visitDate field exists
        limit: parseInt(limit), // Parse the limit to an integer
      });
  
      res.json(recentPatientVisits);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Failed to fetch recent patient visits' });
    }
  };
  