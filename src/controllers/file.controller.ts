import { User } from '../models/user.model'
import { Job } from '../models/job.model'
import { NewsEvent } from '../models/news_event.model'
import { Project } from '../models/project.model'
// plug cloudinary
import { cloudinaryConfig } from '../util/cloudinary'
import { Request, Response } from 'express'
//uploading image package
import Formidable from 'formidable'
const path = require('path')
const uploadDir = path.join(__dirname, '../uploads')

// upload image

export class FileController {
  FileController() {}

  async upload(req: Request, res: Response) {
    try {
      // checking which action to upload for
      const q = req.query.model
      let model: any // model to assign the object parallel to the given object
      if (q === 'user') {
        model = await User.findById(req.params.id)
      } else if (q === 'job') {
        model = await Job.findById(req.params.id)
      } else if (q === 'news_event') {
        model = await NewsEvent.findById(req.params.id)
      } 
      else if (q === 'project') {
      model = await Project.findById(req.params.id)
    }
      else
        return res.status(404).send({
          success: false,
          data: 'Action not found'
        })

      if (!model)
        return res
          .send({
            success: false,
            data: 'Object not found'
          })
          .status(404)

      // formidable
      let data: any = {}

      var form = new Formidable.IncomingForm({
        keepExtensions: true,
        uploadDir: uploadDir
      })

      form.on('fileBegin', async (name, file: any) => {
        try {
          let fileName: string = file.name
          data.files = fileName
          file.path = path.join(uploadDir, fileName)
        } catch (e) {
          console.log(e)
        }
      })

      form.parse(req, async (err, fields, files) => {
        try {
          //get other fields
          if (err) {
            console.log('Error occured')
          }
          data = {
            ...data,
            ...fields
          }

          if (data.files) {
            let cloudResponse: any
            if (model.file_link) {
              let fileData = model.file_link
              await cloudinaryConfig.uploader.destroy(
                'Kigali-Green-Gallery-store/' + fileData,
                function (error: any, result: string) {
                //   console.log(result, error)
                }
              )
              cloudResponse = await cloudinaryConfig.uploader.upload(
                './src/uploads/' + data.files,
                {
                  use_filename: true,
                  unique_filename: false,
                  folder: 'Kigali-Green-Gallery-store'
                }
              )
            } else {
              cloudResponse = await cloudinaryConfig.uploader.upload(
                './src/uploads/' + data.files,
                {
                  use_filename: true,
                  unique_filename: false,
                  folder: 'Kigali-Green-Gallery-store'
                }
              )
            }

            model.file_link = cloudResponse.secure_url

            model.save()

            return res
              .json({
                success: true,
                message: 'File saved successfully',
                data: model
              })
              .status(200)
          }
          console.log(model)
        } catch (e: any) {
          res.json({
            success: false,
            message: e.message
          })
        }
      })
      // formidable ends here
    } catch (err: any) {
      return res
        .send({
          success: false,
          data: err.message
        })
        .status(400)
    }
  }
}
