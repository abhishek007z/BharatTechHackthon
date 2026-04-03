import imageKit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from "fs";
/*
|--------------------------------------------------------------------------
| Create Resume
|--------------------------------------------------------------------------
| POST : /api/resumes/create
| Protected Route
*/
export const createReasume = async (req, res) => {
  try {
    const userId = req.userId;

    if (!req.body.resumeData) {
      return res.status(400).json({
        message: "resumeData is required",
      });
    }

    const resumeData = JSON.parse(req.body.resumeData);

    const newResume = await Resume.create({
      userId,
      ...resumeData,
    });

    return res.status(201).json({
      message: "Resume created successfully",
      resume: newResume,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};


/*
|--------------------------------------------------------------------------
| Delete Resume
|--------------------------------------------------------------------------
| DELETE : /api/resumes/delete/:resumeId
| Protected Route
*/
export const deleteReasume = async (req, res) => {
  try {
    // userId from auth middleware
    const userId = req.userId;

    // resume id from params
    const { resumeId } = req.params;

    // delete resume only if it belongs to the user
    await Resume.findOneAndDelete({ userId, _id: resumeId });

    // success response
    return res.status(200).json({
      message: "Resume delete successfuly",
    });
  } catch (error) {
    // error response
    return res.status(400).json({
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get Resume By ID (User)
|--------------------------------------------------------------------------
| GET : /api/resumes/get/:resumeId
| Protected Route
*/
export const getResumeById = async (req, res) => {
  try {
    // logged-in user id
    const userId = req.userId;

    // resume id from params
    const { resumeId } = req.params;

    // find resume belonging to user
    const resume = await Resume.findOne({ userId, _id: resumeId });

    // if resume not found
    if (!resume) {
      return res.status(404).json({
        message: "Resume not found ",
      });
    }

    // remove unnecessary fields before response
    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;

    // return resume
    return res.status(200).json({
      resume,
    });
  } catch (error) {
    // error response
    return res.status(400).json({
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get Public Resume By ID
|--------------------------------------------------------------------------
| GET : /api/resumes/public/:resumeId
| Public Route
*/
export const getPublicResumeById = async (req, res) => {
  try {
    // resume id from params
    const { resumeId } = req.params;

    // find public resume by id
    const resume = await Resume.findOne({
      public: true,
      _id: resumeId,
    });

    // if resume not found
    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    // return public resume
    return res.status(200).json({
      resume,
    });
  } catch (error) {
    // error response
    return res.status(400).json({
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Update Resume
|--------------------------------------------------------------------------
| PUT : /api/resumes/update
| Protected Route
*/

export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;
    const image = req.file;

    let resumeDataCopy;

    // ✅ handle FormData + JSON both
    if (typeof resumeData === "string") {
      resumeDataCopy = JSON.parse(resumeData);
    } else {
      resumeDataCopy = structuredClone(resumeData);
    }

    // ✅ image upload with face focus + bg remove
if (image) {
  const stream = fs.createReadStream(image.path);

  const response = await imageKit.files.upload({
    file: stream,
    fileName: "resume.png",
    folder: "user-resume",
    transformation: {
      pre:
        "w-400,h-400,fo-face,c-fill,bg-ffffff" +
        (removeBackground ? ",e-bgremove" : ""),
    },
  });

  resumeDataCopy.professional_info ??= {};
  resumeDataCopy.professional_info.image = response.url;
}

  const resume = await Resume.findOneAndUpdate(
  { userId, _id: resumeId },
  { $set: resumeDataCopy },
  { new: true }
);

    return res.status(200).json({
      message: "Save Successfully",
      resume,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};


// import Resume from "../models/Resume";

// // control for creating a new resume
// // POST : /api/resumes/create

// export const createReasume = async (req, res) => {
//     try {
//         const userId = req.userId;
//         const { title } = req.body;

//         // create new resume
//         const newResume = await Resume.create({ userId, title })
//         return res.status(201).json({
//             message: 'Resume created successfuly', Resume  = newResume
//         })
//     } catch (error) {
//         return res.status(400).json({
//             message: error.message
//         })
//     }
// }

// // control for deleting a new resume
// // DELETE : /api/resumes/delete

// export const deleteReasume = async (req, res) => {
//     try {
//         const userId = req.userId;
//         const { resumeId } = req.params;

//         // create new resume
//         await Resume.findOneAndDelete(userId, _id: resumeId)
//         // return success message
//         return res.status(200).json({

//             message: 'Resume delete successfuly',
//         })
//     } catch (error) {
//         return res.status(400).json({
//             message: error.message
//         })
//     }
// }

// // get user resume by id
// // GET : /api/resumes/get

// export const getResumeById = async (req, res) => {
//     try {
//         const userId = req.userId;
//         const { resumeId } = req.params;

//         // create new resume
//         const resume = await Resume.findOne({ userId, _id: resumeId })

//         if (!resume) {
//             return res.status(404).json({

//                 message: 'Resume not found '
//             })
//         }
//         resume.v = undefined;
//         resume.createdAt = undefined;
//         resume.updatedAt = undefined;
//         return res.status(200).json({

//             resume
//         })

//     } catch (error) {
//         return res.status(400).json({
//             message: error.message
//         })
//     }
// }

// // get resume by id (public)
// // GET : /api/resumes/public/:resumeId
// export const getPublicResumeById = async (req, res) => {
//   try {
//     const { resumeId } = req.params;

//     const resume = await Resume.findOne({
//       public: true,
//       _id: resumeId,
//     });

//     if (!resume) {
//       return res.status(404).json({
//         message: "Resume not found",
//       });
//     }

//     return res.status(200).json({
//       resume,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       message: error.message,
//     });
//   }
// };

// // controller for updating a resume
// // GET : /api/resumes/update
// export const updateResume = async (req, res) => {
//     try {
//        const userId = req.userId;
//        const {resumeId , resumeData , removeBackground} = req.body
//        const image = req.file;

//        let resumeDataCopy = JSON.parse(resumeData);
//        const resume = await Resume.findByIdAndUpdate({userId , _id : resumeId} , resumeDataCopy , {new : true})

//        return res.status(200).json({message : 'Save Successfully' , resume})
//     } catch (error) {
//          return res.status(400).json({
//       message: error.message,
//     });
//     }
// }
