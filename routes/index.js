import express from 'express';

const router = express.Router();

import { registerController, loginController, userController, productController } from '../controllers';


const multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './media/profiles/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


// User routes
router.post('/create-user', registerController.register);
router.post('/login-user', loginController.login);
router.post('/set-user-profile', upload.single('profileImage'), userController.setProfilePic);

// Products routes
router.get('/add-prouct', productController.addProduct);
router.get('/get-all-prouct', productController.getAllProducts);


export default router;