import Patients from "../models/PatientModel.js";
import multer from 'multer';
import path from 'path';

export const getPatients = async (req, res) => {
    try {
        const patients = await Patients.findAll({
            attributes: ['id', 'firstName', 'lastName', 'middleName', 'gender', 'dateOfBirth', 'phoneNumber', 'address', 'profilePicture', 'createdAt'],
            order: [['createdAt', 'DESC']],
        });
        console.log(patients);
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

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads'); // Set the destination folder where uploaded files will be stored
    },
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`); // Set the file name and extension
    },
  });
  
  // File upload middleware
  const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size (optional)
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png|gif/; // Define accepted file types
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb('Error: Images only!');
      }
    },
  }).single('profilePicture'); // 'profilePicture' should match the name attribute in your form for file upload
  

  export const createPatient = async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ msg: err });
      }
  
      const { firstName, lastName, gender, dateOfBirth, phoneNumber, address, middleName } = req.body;
  
      try {
        let profilePicture = ''; // Initialize profilePicture variable
  
        if (req.file) {
          profilePicture = req.file.path; // Get the file path of the uploaded picture
        }
  
        const newPatient = await Patients.create({
          firstName,
          lastName,
          gender,
          dateOfBirth,
          phoneNumber,
          address,
          middleName,
          profilePicture, // Assign the profilePicture variable to the database field
        });
  
        res.status(201).json({ msg: "Patient created successfully", patient: newPatient });
      } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Failed to create patient" });
      }
    });
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
