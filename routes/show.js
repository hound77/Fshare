const router = require('express').Router();
const File = require('../models/files');

router.get('/:uuid', async (req, res) => {
//     try {
//         const file = await File.findOne({ uuid: req.params.uuid });
//         // Link expired
//         if(!file) {
//             return res.render('download', { error: 'Link has been expired.'});
//         } 
//         return res.render('download', { 
//             uuid: file.uuid, 
//             fileName: file.filename, 
//             fileSize: file.size, 
//             downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}` 
//         });
//     } catch(err) {
//         return res.render('download', { error: 'Something went wrong.'});
//     }
// });

File.findOne({ uuid: req.params.uuid }, (err, file) => {
    console.log(req.params.uuid + file);
    
    if (err) {
        return res.send('File not found!')
    } else {
        if (file !== null) {
            const fileInfo = {
                uuid: file.uuid,
                fileName: file.filename,
                fileSize: file.size,
                downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
            };
            return res.render("download", { fileInfo });
        } else {
            res.send('File not found!');
        }
    }
})
});

module.exports = router;