import Joi from 'joi';
import { User } from '../../models';
import bcrypt from 'bcrypt';
import CustomErrorHandler from '../../services/CustomErrorHandler';

const loginController = {

    async login(req, res, next) {

        // Validation
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            // password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            password: Joi.string().required(),
        });
        const { error } = loginSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return next(CustomErrorHandler.wrongCredentials());
            }
            // compare the password
            const match = await bcrypt.compare(req.body.password, user.password);
            if (!match) {
                return next(CustomErrorHandler.wrongCredentials());
            }

            // database whitelist
            res.json({
                id: user._id,
                full_name: user.full_name,
                email: user.email,
                profile_image: user.profile_image,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
             });

        } catch (err) {
            return next(err);
        }

    }

}

export default loginController;