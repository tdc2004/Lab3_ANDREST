const express = require('express');
const mongoose = require('mongoose');

const uri = "mongodb+srv://chinhtdph40493:chinh123@cluster0.f5kzsvz.mongodb.net/MD18309"
const app = express();
const UserModel = require('./Models/user');
app.use(express.json());

// day danh sach len
app.listen(3000, () => {
    console.log("server is running");
})
mongoose.connect(uri).then(() => console.log("Connect thanh cong")).catch(err => console.log(err));

app.get('/list', async (req, res) => {
    let users = await UserModel.find();
    console.log(users);
    res.send(users)
})

// add danh sach
app.post('/add_user', async (req, res) => {
    try {

        // Lấy dữ liệu người dùng từ yêu cầu body
        const userData = req.body;

        // Tạo một người dùng mới trong cơ sở dữ liệu
        const newUser = await UserModel.create(userData);
        console.log(newUser);

        // Lấy danh sách tất cả người dùng sau khi đã thêm người dùng mới
        const users = await UserModel.find();

        // Gửi danh sách người dùng về cho client
        res.send(users);
    } catch (error) {
        // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra trong quá trình thêm người dùng
        res.status(500).send(error);
    }
});

//Update user
app.put('/list/:id', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        await user.updateOne({ '$set': req.body });
        res.status(200).json("Updated Successfully")
    } catch (err) {
        res.status(500).json(err)
    }
});

// delete user
app.delete('/list/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId);
        // Kiểm tra xem userId có hợp lệ không
        if (!userId) {
            return res.status(400).send("Invalid user ID");
        }

        // Thực hiện xóa người dùng từ cơ sở dữ liệu
        const deletedUser = await UserModel.findByIdAndDelete(userId);

        // Kiểm tra xem người dùng đã được xóa thành công chưa
        if (!deletedUser) {
            return res.status(404).send("User not found");
        }

        res.status(200).send("User deleted successfully");
    } catch (error) {
        // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra trong quá trình xóa người dùng
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});


