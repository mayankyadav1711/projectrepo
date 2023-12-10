const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Project = mongoose.model("Project");


router.post("/uploadproject", async (req, res) => {
  try {
    const {
        projectTitle,
        abstract,
        description,
        domain,
        images,
        technologyStack,
        googleDriveLink,
        projectVisibility,
        youtubeVideoLink,
        teamMembers,
        mentors,
        projectMethod,
        projectType,
        projectDuration,
        tags,
        flowchart,
        architecture,
        uploadDate,
        postedBy
      } = req.body;
console.log(req.body)
      if (
        !projectTitle ||
        !abstract ||
        !description ||
        !domain ||
        !projectVisibility ||
        !projectMethod ||
        !projectDuration ||
        !uploadDate
      ) {
        return res.status(422).json({ error: 'Please add all the required fields' });
      }
      const projectdata = new Project({
        projectTitle,
        abstract,
        description,
        domain,
        images,
        technologyStack,
        googleDriveLink,
        projectVisibility,
        youtubeVideoLink,
        teamMembers,
        mentors,
        projectMethod,
        projectType,
        projectDuration,
        tags,
        flowchart,
        architecture,
        uploadDate,
        postedBy,
      });

    console.log("Project Data = " +projectdata);
    await projectdata.save();

    // Respond with a success message
    res.status(201).json({ message: "Form submitted successfully!" });
  } catch (error) {
    // Handle errors
    console.error("Error submitting form:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/pdf-forms/:code", async (req, res) => {
  try {
    const code = req.params.code; // Get the 'code' parameter from the URL

    // Find the PdfForm in the database with the given 'code'
    const pdfForm = await PdfForm.findOne({ code });

    if (!pdfForm) {
      // If no PdfForm is found with the given 'code', return an error response
      return res
        .status(404)
        .json({ error: "PDF not found for the given code" });
    }

    // Extract the 'link' property from the pdfForm and send it as the response
    const { sem, sub, unit, link, author, description, extra, timestamp } =
      pdfForm;
    res.json({ sem, sub, unit, link, author, description, extra, timestamp });
  } catch (error) {
    // Handle errors
    console.error("Error fetching PDF link:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
