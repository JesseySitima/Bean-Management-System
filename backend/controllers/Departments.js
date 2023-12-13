import Department from '../models/DepartmentModel.js'; // Import the Department model

// Controller functions

export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.json(departments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const createDepartment = async (req, res) => {
  const { DepartmentID, DepartmentName, Description } = req.body;

  try {
    const newDepartment = await Department.create({
      DepartmentID,
      DepartmentName,
      Description,
    });

    res.status(201).json({ msg: 'Department created successfully', department: newDepartment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Failed to create department' });
  }
};

export const getDepartmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const department = await Department.findByPk(id);
    if (!department) {
      return res.status(404).json({ msg: 'Department not found' });
    }
    res.json(department);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { DepartmentID, DepartmentName, Description } = req.body;

  try {
    const department = await Department.findByPk(id);
    if (!department) {
      return res.status(404).json({ msg: 'Department not found' });
    }

    // Update department information
    await Department.update(
      {
        DepartmentID,
        DepartmentName,
        Description,
      },
      {
        where: { DepartmentID: id },
      }
    );

    res.json({ msg: 'Department updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Failed to update department' });
  }
};

export const deleteDepartment = async (req, res) => {
  const { id } = req.params;

  try {
    const department = await Department.findByPk(id);
    if (!department) {
      return res.status(404).json({ msg: 'Department not found' });
    }

    await Department.destroy({
      where: { DepartmentID: id },
    });

    res.json({ msg: 'Department deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Failed to delete department' });
  }
};


