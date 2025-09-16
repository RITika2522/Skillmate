// config/passport-setup.js
import axios from "axios";
import fs from "fs";
import path from "path";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          // Update profile picture if available
          if (profile.photos && profile.photos.length > 0) {
            const photoUrl = profile.photos[0].value;
            const fileName = `${profile.id}.jpg`;
            const uploadPath = path.join(
              process.cwd(),
              "uploads",
              "profile-pictures",
              fileName
            );

            const imageRes = await axios.get(photoUrl, {
              responseType: "arraybuffer",
            });
            fs.writeFileSync(uploadPath, imageRes.data);

            user.profilePicture = `/uploads/profile-pictures/${fileName}`;
            await user.save();
          }

          return done(null, user);
        }

        // Create new user
        let profilePicturePath;
        if (profile.photos && profile.photos.length > 0) {
          const photoUrl = profile.photos[0].value;
          const fileName = `${profile.id}.jpg`;
          const uploadPath = path.join(
            process.cwd(),
            "uploads",
            "profile-pictures",
            fileName
          );

          const imageRes = await axios.get(photoUrl, {
            responseType: "arraybuffer",
          });
          fs.writeFileSync(uploadPath, imageRes.data);

          profilePicturePath = `/uploads/profile-pictures/${fileName}`;
        }

        const newUser = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          profilePicture: profilePicturePath || "",
          password: null, // Google login doesn’t need password
          skills: ["Not specified"], // default skills if required
        });

        return done(null, newUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;
