import Joi from 'joi';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import { User } from '../../models';

import bcrypt from 'bcrypt';

const registerController = {

    async register(req, res, next) {

        // Validations
        const registreSchema = Joi.object({
            full_name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            profileImage: Joi.string(),
        });

        const { error } = registreSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        // Check if user in db
        try {
            const exist = await User.exists({ email: req.body.email });
            if (exist) {
                return next(CustomErrorHandler.alreadyExist('This email is already taken!'));
            }
        } catch (error) {
            return next(error);
        }

        const { full_name, email, password, profileImage=null } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // prepare the model
        const user = new User({
            full_name,
            email,
            profileImage,
            password: hashedPassword
        });

        let result;

        try {
            result = await user.save();
        } catch (err) {
            return next(err);
        }

        res.json({
            msg: "User created successfully",
            ResponseCode: 201,
            data: result._doc
        });

    }

}

export default registerController;