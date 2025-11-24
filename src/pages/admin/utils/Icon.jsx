import { FaCalendarAlt, FaLaptop } from "react-icons/fa";
import { HiOutlineUser } from "react-icons/hi";
import { RxDashboard } from "react-icons/rx";
import { FaGear } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineKeyboardArrowLeft,MdOutlineKeyboardArrowRight,MdOutlineKeyboardArrowDown,MdOutlineModeEdit,MdOutlineRemoveRedEye,MdFilterList } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiSignpostDuo1 } from "react-icons/ci";
import { FaUserFriends } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { DiAptana } from "react-icons/di";
import { FaSquarePollVertical } from "react-icons/fa6";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { BsSignpost2Fill } from "react-icons/bs";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { BsPrinter } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { FaUserLock } from "react-icons/fa";
import { FaBuilding, FaCheckCircle, FaDoorOpen,  } from "react-icons/fa";
import { RiServiceFill } from "react-icons/ri";
import { MdRoomService } from "react-icons/md";
import { MdHomeRepairService } from "react-icons/md";
import { LiaUserClockSolid } from "react-icons/lia";
import { FaCodePullRequest } from "react-icons/fa6";
import { RiCustomerService2Line } from "react-icons/ri";
import { GrTransaction } from "react-icons/gr";


const iconMap = {
  GrTransaction,
  RiCustomerService2Line,
  FaCodePullRequest,
  LiaUserClockSolid,
  MdHomeRepairService,
  MdRoomService ,
  RiServiceFill,
  FaDoorOpen,
  FaUserLock,
  MdLogout,
  FaRegCalendarCheck,
  BsSignpost2Fill,
  RiDashboardHorizontalFill,
  FaSquarePollVertical,
  DiAptana,
  FaUserAlt,
  FaUserTie,
  FaUserFriends,
  CiSignpostDuo1,
  RxDashboard,
  HiOutlineUser,
  FaCalendarAlt,
  BsPrinter,
  FaLaptop,
  FaGear,
  GiHamburgerMenu,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  RiDeleteBinLine,
  MdOutlineModeEdit,
  MdOutlineRemoveRedEye,
  MdOutlineKeyboardArrowDown,
  MdFilterList
};

const GetIcon = ({ iconName, size = 23, color = "",design='',child='',action=()=>{} }) => {
  const IconComponent = iconMap[iconName];
  return IconComponent ? <IconComponent size={size} color={color} children={child} onClick={action}  className={design} /> : null;
};

export default GetIcon;
