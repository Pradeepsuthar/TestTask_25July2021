import { User } from '../../models';

const userController = {

    async setProfilePic(req, res, next) {
        var id = req.body.userId;
        var profilePic = req.file.path;
        User.findById(id, (err, data) => {
            data.profileImage = profilePic ? profilePic : data.profileImage;
            data.save().then(doc => {
                res.status(201).json({
                    message: "Profile Image Updated Successfully",
                    results: doc
                });
            }).catch(err => {
                res.json(err);
            })
        });
    }

};

export default userController;