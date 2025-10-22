import { Request, Response } from "express";
import {
  getAllRoles,
  getAllUsers,
  getUserById,
  handleCreateUser,
  handleDeleteUser,
  updateUserById,
} from "services/user.service";

import { name } from "ejs";
import { getProduct } from "services/client/item.service";
const getHomePage = async (req: Request, res: Response) => {

  const products = await getProduct();

  return res.render("client/home/show.ejs", {
    products
  });
};
const getCreateUserPage = async (req: Request, res: Response) => {
  const roles = await getAllRoles();
  return res.render("admin/user/create.ejs", {
    roles: roles,
  });
};
const postCreateUser = async (req: Request, res: Response) => {
  const { fullName, username, phone, role, address } = req.body;
  const file = req.file; // lấy file từ multer, null(undefined) nếu không có file
  const avatar = file?.filename ?? null; // lấy tên file đã được multer xử lý
  // handle create user: lưu người dùng
  await handleCreateUser(fullName, username, address, phone, avatar, role);

  return res.redirect("/admin/user");
};

const postDeleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await handleDeleteUser(id);
  return res.redirect("/admin/user");
};

const getViewUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  // get user by id
  const user = await getUserById(id);
  const roles = await getAllRoles();
  return res.render("admin/user/detail.ejs", {
    id: id,
    user: user,
    roles: roles,
  });
};

const postUpdateUser = async (req: Request, res: Response) => {
  const { id, fullName,  phone, role, address } = req.body;
  const file = req.file; // lấy file từ multer, null(undefined) nếu không có file
  const avatar = file?.filename ?? null; // lấy tên file đã được multer xử lý
  await updateUserById(id, fullName, phone, role, address, avatar);
  return res.redirect("/admin/user");
};

export {
  getHomePage,
  getCreateUserPage,
  postCreateUser,
  postDeleteUser,
  getViewUser,
  postUpdateUser,
};
