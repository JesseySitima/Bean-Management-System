import Diagnosis from '../models/DiagnosisModel.js'; // Import the Diagnosis model

// Controller functions

export const getDiagnoses = async (req, res) => {
  try {
    const diagnoses = await Diagnosis.findAll();
    res.json(diagnoses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const createDiagnosis = async (req, res) => {
  const { DiseaseICD, DiseaseName, Description } = req.body;

  try {
    const newDiagnosis = await Diagnosis.create({
      DiseaseICD,
      DiseaseName,
      Description,
    });

    res.status(201).json({ msg: 'Diagnosis created successfully', diagnosis: newDiagnosis });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Failed to create diagnosis' });
  }
};

export const getDiagnosisById = async (req, res) => {
  const { id } = req.params;

  try {
    const diagnosis = await Diagnosis.findByPk(id);
    if (!diagnosis) {
      return res.status(404).json({ msg: 'Diagnosis not found' });
    }
    res.json(diagnosis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const updateDiagnosis = async (req, res) => {
  const { id } = req.params;
  const { DiseaseICD, DiseaseName, Description } = req.body;

  try {
    const diagnosis = await Diagnosis.findByPk(id);
    if (!diagnosis) {
      return res.status(404).json({ msg: 'Diagnosis not found' });
    }

    // Update diagnosis information
    await Diagnosis.update(
      {
        DiseaseICD,
        DiseaseName,
        Description,
      },
      {
        where: { DiagnosisID: id },
      }
    );

    res.json({ msg: 'Diagnosis updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Failed to update diagnosis' });
  }
};

export const deleteDiagnosis = async (req, res) => {
  const { id } = req.params;

  try {
    const diagnosis = await Diagnosis.findByPk(id);
    if (!diagnosis) {
      return res.status(404).json({ msg: 'Diagnosis not found' });
    }

    await Diagnosis.destroy({
      where: { DiagnosisID: id },
    });

    res.json({ msg: 'Diagnosis deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Failed to delete diagnosis' });
  }
};
