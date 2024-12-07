const User = require("../models/userModel");
const mongoose = require("mongoose");

exports.home = async (req, res) => {
  const messages = await req.flash("info");

  const locals = {
    title: "Home",
    description: "User Management System",
  };

  try {
    const users = await User.find({});
    res.render("index", { locals, users, messages });
  } catch (error) {
    console.log(error);
  }
};

exports.addUser = async (req, res) => {
  const locals = {
    title: "Add User",
    description: "User Management System",
  };

  res.render("add", locals);
};

exports.postUser = async (req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });

  try {
    await User.create(newUser);
    await req.flash("info", "New user has been added.");
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

exports.viewUser = async (req, res) => {
  const locals = {
    title: "View User",
    description: "User Management System",
  };

  const messages = await req.flash("info");

  try {
    const user = await User.findOne({ _id: req.params.id });
    res.render("view", { locals, user, messages });
  } catch (error) {
    console.log(error);
  }
};

exports.editUser = async (req, res) => {
  const locals = {
    title: "Edit User",
    description: "User Management System",
  };

  try {
    const user = await User.findOne({ _id: req.params.id });

    res.render("edit", { locals, user });
  } catch (error) {
    console.log(error);
  }
};

exports.edit = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      updated: Date.now(),
    });

    await req.flash("info", "User details has been updated.");

    res.redirect(`/view/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
};

exports.delete = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.redirect(`/`);
  } catch (error) {
    console.log(error);
  }
};
