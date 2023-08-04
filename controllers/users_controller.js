const User = require("../models/user");
const fs = require("fs");
const path = require("path");

// let's keep it same as before
module.exports.profile = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    return res.render("user_profile", {
      title: "User Profile",
      profile_user: user,
    });
  } catch (err) {
    req.flash("error", "User not found");
    return res.redirect("back");
  }
};

// module.exports.update = async function(req, res){

//     if(req.user.id == req.params.id){

//         try{

//             let user = await User.findById(req.params.id);
//             User.uploadedAvatar(req, res, function(err){
//                 if (err) {console.log('*****Multer Error: ', err)}

//                 user.name = req.body.name;
//                 user.email = req.body.email;

//                 if (req.file){

//                     if (user.avatar){
//                         fs.unlinkSync(path.join(__dirname, '..', user.avatar));
//                     }

//                     // this is saving the path of the uploaded file into the avatar field in the user
//                     user.avatar = User.avatarPath + '/' + req.file.filename;
//                 }
//                 user.save();
//                 return res.redirect('back');
//             });

//         }catch(err){
//             req.flash('error', err);
//             return res.redirect('back');
//         }

//     }else{
//         req.flash('error', 'Unauthorized!');
//         return res.status(401).send('Unauthorized');
//     }
// }

module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findByIdAndUpdate(req.params.id);
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("**** Multer Error *****", err);
        }
        user.name = req.body.name;
        user.email = req.body.email;
        if (req.file) {
          if (user.avatar) {
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          }
          // saving path of uploaded file in avatar filed in user DB
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        return res.redirect("back");
      });
    } catch (err) {
      req.flash("error", err);
      return res.redirect("back");
    }
  } else {
    req.flash("error", "Unauthorized");
    return res.status(401).send("Unauthorized");
  }
};

// render the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_up", {
    title: "Cpx | Sign Up",
  });
};

// render the sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Cpx | Sign In",
  });
};

module.exports.create = async function (req, res) {
  try {
    if (req.body.password !== req.body.confirm_password) {
      req.flash("error", "Passwords do not match");
      return res.redirect("back");
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      await User.create(req.body);
      req.flash("success", "You have signed up, login to continue!");
      return res.redirect("/users/sign-in");
    } else {
      req.flash("success", "You have signed up, login to continue!");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
  req.flash("success", "Logged in Successfully");
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  //     try {
  //         req.logout();
  //         req.flash('success', 'You have logged out!');
  //         return res.redirect('/');
  //     } catch (err) {
  //         req.flash('error', 'Error logging out');
  //         return res.redirect('/');
  //     }
  // };
  req.logout(function (err) {
    // req.logout() is now an asynchronous function, whereas previously it was synchronous
    if (err) {
      return next(err);
    }
    req.flash("success", "You have logged out !");
    // console.log('a2' ,   "You have logged out !");
    return res.redirect("/");
  });
};
