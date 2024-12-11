const User = require("../models/userModel");

exports.home = async (req, res) => {
  const messages = await req.flash("info");

  const locals = {
    title: "Home",
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
    title: "Add Product",
  };

  res.render("add", locals);
};

exports.postUser = async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    category: req.body.category,
    quantity: req.body.quantity,
    price: req.body.price,
    description: req.body.description,
  });

  try {
    await User.create(newUser);
    await req.flash("info", "New Product has been added.");
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

exports.viewUser = async (req, res) => {
  const locals = {
    title: "View Product",
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
    title: "Edit Product",
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
      name: req.body.name,
      category: req.body.category,
      quantity: req.body.quantity,
      price: req.body.price,
      description: req.body.description,
    });

    await req.flash("info", "Product details has been updated.");

    res.redirect(`/view/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
};

exports.delete = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    await req.flash("info", "Product has been deleted.");
    res.redirect(`/`);
  } catch (error) {
    console.log(error);
  }
};
