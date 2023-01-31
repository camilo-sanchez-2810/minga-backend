import { User } from "../models/User.js";
import { Author } from "../models/Author.js";
import { Company } from "../models/Company.js";

const AdminUserController = {
  updateRoleCompany: async (req, res, next) => {
    try {
      const { id } = req.params;
      const company = await Company.findOne({ _id: id });
      let iD = company.user_id;
      company.active = !company.active;
      await company.save();
      const updateUser = await User.findOne({ _id: iD });
      updateUser.is_company = !updateUser.is_company;
      await updateUser.save();
      res.status(200).json({ user: updateUser, company: company });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  updateRoleAuthor: async (req, res, next) => {
    try {
      const { id } = req.params;
      const author = await Author.findOne({ _id: id });
      console.log(author);
      let iD2 = author.user_id;
      author.active = !author.active;
      await author.save();
      const updatedUser = await User.findOne({ _id: iD2 });
      updatedUser.is_author = !updatedUser.is_author;
      await updatedUser.save();
      res.status(200).json({ user: updatedUser, author: author });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  getCompanies: async (req, res, next) => {
    try {
      const active = req.query.active === "true";
      const {companies} = await Company.find({ active });
      console.log(companies)
      return res.status(200).json({
        success: true,
        response: companies,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  getAuthor: async (req, res, next) => {
    try {
      const active = req.query.active === "true";
      const authors = await Author.find({ active });
      return res.status(200).json({
        success: true,
        response: authors,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
export default AdminUserController;
