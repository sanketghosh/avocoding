import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { type Request, type Response } from "express";
import { TOKEN_EXP_AGE } from "../constants";
import { db } from "../lib/prisma";
import { generateJWT } from "../utils/jwt-generator";

/**
REGISTER USER
*/
export const registerUserHandler = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    // if user exists with same email cannot create one
    if (user) {
      return res.status(401).json({
        message: "ERROR! Bad request cannot register now.",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // else create user
    const newUser = await db.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    const { password: usersPassword, ...userData } = newUser;

    // get token from token generator
    const { jwtToken } = generateJWT(userData.id);

    // data we are sending as response
    const registeredDataToBeSent = {
      userId: newUser.id,
      userUsername: newUser.username,
      userEmail: newUser.email,
      userAvatar: newUser.avatar,
      userCreatedAt: newUser.createdAt,
      message: "SUCCESS! You have been registered.",
    };

    res
      .cookie("auth_token", jwtToken, {
        httpOnly: true,
        maxAge: TOKEN_EXP_AGE,
        // secure: true // in production un-comment it
      })
      .status(200)
      .json(registeredDataToBeSent);
  } catch (error) {
    res.status(500).json({
      message: "ERROR! Internal server error.",
    });
    console.log(error);
  }
};

/**
LOGIN USER
*/
export const loginUserHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "ERROR! Bad request. Email is required",
    });
  }

  if (!password) {
    return res.status(400).json({
      message: "ERROR! Bad request. Password is required",
    });
  }

  try {
    // find user
    const existingUser = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    // if user doesn't exist
    if (!existingUser) {
      return res.status(401).json({
        message:
          "ERROR! Bad request. Cannot login, check your credentials and try again.",
      });
    }

    // assert that existingUser is not null
    const user = existingUser as User;

    // compare password
    let comparePassword = await bcrypt.compare(password, user.password);

    // if compare password fails
    if (!comparePassword) {
      return res.set(401).json({
        message: "ERROR! Invalid credentials.",
      });
    }
    // get token from token generator
    const { jwtToken } = generateJWT(user.id);

    // data we are sending as response
    const loggedInDataToBeSent = {
      userId: user.id,
      userUsername: user.username,
      userEmail: user.email,
      userAvatar: user.avatar,
      userCreatedAt: user.createdAt,
      message: "SUCCESS! You have been logged in.",
    };

    res
      .cookie("auth_token", jwtToken, {
        httpOnly: true,
        maxAge: TOKEN_EXP_AGE,
        // secure: true // in production un-comment it
      })
      .status(200)
      .json(loggedInDataToBeSent);
  } catch (error) {
    res.status(500).json({
      message: "ERROR! Internal server error.",
    });
    console.log(error);
  }
};

/**
LOGOUT USER
*/
export const logoutUserHandler = (req: Request, res: Response) => {
  try {
    res.clearCookie("auth_token").status(200).json({
      message: "SUCCESS! Logged out of your account.",
    });
  } catch (error) {
    res.status(500).json({
      message: "ERROR! Internal server error.",
    });
    console.log(error);
  }
};
