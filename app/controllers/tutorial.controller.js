import Tutorial from "../models/tutorial.model.js";

// Create and Save a new Tutorial
export const create = async (req, res) => {
  try {
    // Validate request
    if (!req.body) {
      return res.status(400).send({ message: "Content cannot be empty!" });
    }

    // Create a new Tutorial instance
    const tutorial = new Tutorial({
      title: req.body.title,
      description: req.body.description,
      published: req.body.published || false,
    });

    // Save Tutorial in the database
    const data = await new Promise((resolve, reject) => {
      Tutorial.create(tutorial, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });

    res.send(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Tutorial.",
    });
  }
};

// Retrieve all Tutorials from the database (with condition).
export const findAll = async (req, res) => {
  try {
    const title = req.query.title || "";
    const data = await new Promise((resolve, reject) => {
      Tutorial.getAll(title, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });

    res.send(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving tutorials.",
    });
  }
};

// Find a single Tutorial by ID
export const findOne = async (req, res) => {
  try {
    const data = await new Promise((resolve, reject) => {
      Tutorial.findById(req.params.id, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });

    res.send(data);
  } catch (error) {
    if (error.kind === "not_found") {
      res
        .status(404)
        .send({ message: `Not found Tutorial with id ${req.params.id}.` });
    } else {
      res.status(500).send({
        message: "Error retrieving Tutorial with id " + req.params.id,
      });
    }
  }
};

// Retrieve all published Tutorials
export const findAllPublished = async (req, res) => {
  try {
    const data = await new Promise((resolve, reject) => {
      Tutorial.getAllPublished((err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });

    res.send(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving tutorials.",
    });
  }
};

// Update a Tutorial by ID
export const update = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Content cannot be empty!" });
    }

    const data = await new Promise((resolve, reject) => {
      Tutorial.findById(req.params.id, (err, existingTutorial) => {
        if (err) return reject(err);
        resolve(existingTutorial);
      });
    });

    const updatedTutorial = {
      title: req.body.title || data.title,
      description: req.body.description || data.description,
      published:
        req.body.published !== undefined ? req.body.published : data.published,
    };

    const result = await new Promise((resolve, reject) => {
      Tutorial.updateById(
        req.params.id,
        updatedTutorial,
        (err, updatedData) => {
          if (err) return reject(err);
          resolve(updatedData);
        }
      );
    });

    res.send(result);
  } catch (error) {
    if (error.kind === "not_found") {
      res
        .status(404)
        .send({ message: `Not found Tutorial with id ${req.params.id}.` });
    } else {
      res
        .status(500)
        .send({ message: "Error updating Tutorial with id " + req.params.id });
    }
  }
};

// Delete a Tutorial by ID
export const deleteTutorial = async (req, res) => {
  try {
    const result = await new Promise((resolve, reject) => {
      Tutorial.remove(req.params.id, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });

    res.send({ message: "Tutorial was deleted successfully!" });
  } catch (error) {
    if (error.kind === "not_found") {
      res
        .status(404)
        .send({ message: `Not found Tutorial with id ${req.params.id}.` });
    } else {
      res.status(500).send({
        message: "Could not delete Tutorial with id " + req.params.id,
      });
    }
  }
};

// Delete all Tutorials
export const deleteAll = async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      Tutorial.removeAll((err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });

    res.send({ message: "All Tutorials were deleted successfully!" });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while removing all tutorials.",
    });
  }
};
