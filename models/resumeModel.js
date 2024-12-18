import mongoose from "mongoose";

const resumeSchema =new mongoose.Schema({
    resumeId:{
        type:String,
        required: true,
    },
    firstName : {
        type:String,
        default : 'Umesh' ,
    },
    lastName : {
        type:String,
        default : 'ChaiWala',
    },
    jobTitle : {
        type:String,
        default : 'full stack developer' ,
    },
    address : {
        type:String,
        default : '525 N tryon Street, NC 28117',
    },
    phone : {
        type:String,
        default :'+xx xxxxx xxxxx',
    },
    email : {
        type:String,
        default : 'exmaple@gmail.com',
    },
    firstLinkName : {
        type:String,
        default :'Github' ,
    },
    secondLinkName : {
        type:String,
        default :'Linkdin',
    },
    firstLink : {
        type:String,
        default :'www.github.com' ,
    },
    secondLink : {
        type:String,
        default : 'www.linkdin.com',
    },
    themeColor : {
        type:String,
        default :'#440CCC' ,
    },
    education : {
        collageName : {
            type:String,
            default : 'Nirma University',
        },
        collageSpi : {
            type:String,
            default :'7.0' ,
        },
        branch : {
            type:String,
            default : 'B.tech',
        },
        higherEdu : {
            type:String,
            default : 'HSC',
        },
        higherEduSchool : {
            type:String,
            default : 'Aashadeep',
        },
        higerEduMark : {
            type:String,
            default : '79%',
        },
        secondSchool : {
            type:String,
            default :'Ankur',
        },
        secondMark : {
            type:String,
            default : '85%',
        },
    },
    summery : {
        type :String,
        default : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    Sections:{
        type : Object,
        default : {
            section_0 : {
                name : 'hii'
            }
        }
    }
});

export default mongoose.model('Resume',resumeSchema);