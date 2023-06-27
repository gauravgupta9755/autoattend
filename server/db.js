const { query } = require('express');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => console.log('Connected!'));

const Student_Schema = new Schema({
    name: {
        type: String,
        required: true,

    },
    enroll: {
        type: String,
        required: true,
        unique: true
    },
    reg: {
        type: Array,

    },
    encode: {
        type: Array
    }


});

const Teacher_Schema = new Schema({
    username: {
        type: String,
        unique: true
    },
    regIds: {
        type: Array,
    },
    password: {
        type: String,
        required: true
    }
});

const Reg_Schema = new Schema({
    sem: {
        type: String,
    },
    branch: {
        type: String,
    },
    year: {
        type: String
    },
    subject: {
        type: String
    },
    attendance: [{
        date: {
            type: String
        },
        enroll: {
            type: Array
        }

    }]
});


const StudentModel = mongoose.model("Student", Student_Schema)
const TeacherModel = mongoose.model("Teacher", Teacher_Schema)
const RegModel = mongoose.model("Reg", Reg_Schema)
// const sd=new StudentModel({name:"gaurav",enroll:"dfdfdfdf"})
const getstudent = async (regId) => {
    const result = await StudentModel.find({ reg: { $in: regId } }, { name: 0, reg: 0 })
    if (result) {
        return result;
    }
    else return []
}
const attendSave = async (enroll, regId) => {

    const date = new Date().toDateString()
    
    const result = await RegModel.find({ _id: regId, "attendance.date": date }).count();
    if (result) {
        const res = await RegModel.updateOne({ _id: regId, date: date }, { $push: { "attendance.$[].enroll": enroll } })

        if (res.acknowledged) {
            return { status: 1, msg: "student present" }
        }
        else {
            return { status: 11, msg: "something  wrong" }
        }

    }
    else {
       const res= await RegModel.updateOne({_id:regId},{$push:{attendance:{date:date,enroll:[enroll]}}})
       if(res.acknowledged){
        return { status: 1, msg: "student present" }
       }
       else{
        return { status: 11, msg: "something  wrong" }
       }
    }
}



const loginVarification = async (data, res) => {
    const result = await TeacherModel.find({ username: data.username, password: data.password }, { password: 0 })
    console.log(result)
    if (result.length) {
        res.send({ status: 1, msg: "loged in", data: { regIds: result[0].regIds, username: result[0].username } })
    }
    else {
        res.send({ status: 11, msg: "username or password did not match" })
    }

}

const saveStudent = async (encode, name, enroll, regId) => {

    if (await StudentModel.find({ enroll: enroll }).count() <= 0) {
        const sd = new StudentModel({ name: name, enroll: enroll, encode: encode, reg: [regId] })
        await sd.save()
        return ({ status: 1, msg: "student and his regId inserted" })
    }
    else if (await StudentModel.find({ enroll: enroll, reg: { $in: regId } }).count() <= 0) {
        const result = await StudentModel.updateOne({ enroll: enroll }, { $push: { reg: regId } })
        if (result) {
            return ({ status: 1, msg: "student is already insert and regId inserted" });
        }
        else {
            return ({ stauts: 11, msg: "something wrong" });
        }
    }
    else {
        return ({ status: 1, msg: "student and regId already insert" })
    }
}

const getAttendance=async(regId)=>{
    const res=await RegModel.find({_id:regId},{attendance:1})
    
    if(res.length){
   
        return res[0]
    }
    else{
        return {}
    }
}
const getStudentList=async(regId)=>{
    const result = await StudentModel.find({ reg: { $in: regId } },{reg:0,encode:0})
    return result
}


const getreg=async(regIds)=>{
    const result =await RegModel.find({_id:{$in:regIds}})
    var arr=[];
    for(var i=0;i<result.length;i++){
    const st=`SUBJECT-${result[i].subject}_SEM-${result[i].sem}_BRANCH-${result[i].branch}_YEAR-${result[i].year}`

    arr.push({regId:result[i]._id,st:st});
    }
    return arr;
    
}

module.exports = { getstudent, attendSave, loginVarification, saveStudent,getAttendance,getStudentList,getreg }