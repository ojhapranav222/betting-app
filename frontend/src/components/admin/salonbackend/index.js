const ApiFeatures = require("./utils/apiFeatures");


const express = require("express");
const cors = require("cors");
const { CloudDownload } = require("lucide-react");

//sample data
let orders = require("./sampleData/orderData");
let userData = require("./sampleData/userData");
let partnerData = require("./sampleData/partnerData");
let packageData = require("./sampleData/packageData");
let serviceData = require("./sampleData/serviceData");
let appointmentsData = require("./sampleData/appointmentData");
let disputeData = require("./sampleData/disputeData");
let messageData = require("./sampleData/messageData");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Sample Data
const hourlyData = [
  { time: "4am", bookings: 8 },
  { time: "5am", bookings: 6 },
  { time: "6am", bookings: 15 },
  { time: "7am", bookings: 10 },
  { time: "8am", bookings: 34 },
  { time: "9am", bookings: 30 },
  { time: "10am", bookings: 35 },
  { time: "11am", bookings: 45 },
  { time: "12pm", bookings: 40 },
  { time: "1pm", bookings: 25 },
  { time: "2pm", bookings: 25 },
  { time: "3pm", bookings: 32 },
];

const weeklyData = [
  { day: "12", revenue: 1200 },
  { day: "13", revenue: 1400 },
  { day: "14", revenue: 1600 },
  { day: "15", revenue: 1800 },
  { day: "16", revenue: 2000 },
  { day: "17", revenue: 2525 },
  { day: "18", revenue: 2400 },
];

const recentBookings = [
  { name: "Jessica S.", date: "24.05.2020", amount: "$124.97", status: "Confirmed" },
  { name: "Andrew S.", date: "23.05.2020", amount: "$55.42", status: "Pending" },
  { name: "Kevin S.", date: "23.05.2020", amount: "$89.90", status: "Pending" },
  { name: "Jack S.", date: "22.05.2020", amount: "$144.94", status: "Confirmed" },
  { name: "Arthur S.", date: "22.05.2020", amount: "$70.52", status: "Pending" },
];

const topServices = [
  { name: "Hair Cut", image: "/loyd.png", price: "$49.90", bookings: 204 },
  { name: "Massage & Spa", image: "/loyd.png", price: "$34.90", bookings: 155 },
  { name: "Hair Style", image: "/loyd.png", price: "$40.90", bookings: 120 },
  { name: "Beard Trim", image: "/loyd.png", price: "$49.90", bookings: 204 },
  { name: "Hair Care", image: "/loyd.png", price: "$34.90", bookings: 155 },
];

const topCustomers = [
  { name: "Harry Potter", image: "/loyd.png", price: "$969.37", bookings: 52 },
  { name: "Draco Malfoy", image: "/loyd.png", price: "$909.54", bookings: 43 },
  { name: "Hermione Granger", image: "/loyd.png", price: "$728.66", bookings: 41 },
  { name: "Minerva McGonagall", image: "/loyd.png", price: "$629.42", bookings: 38 },
  { name: "Albus Dumbledore", image: "/loyd.png", price: "$549.71", bookings: 34 },
];

const customerMonthlyData = [
  { month: "January", newCustomers: 250, returningCustomers: 600 },
  { month: "February", newCustomers: 300, returningCustomers: 700 },
  { month: "March", newCustomers: 400, returningCustomers: 800 },
  { month: "April", newCustomers: 350, returningCustomers: 750 },
  { month: "May", newCustomers: 200, returningCustomers: 650 },
  { month: "June", newCustomers: 300, returningCustomers: 700 },
  { month: "July", newCustomers: 450, returningCustomers: 900 },
  { month: "August", newCustomers: 300, returningCustomers: 750 },
  { month: "September", newCustomers: 400, returningCustomers: 850 },
  { month: "October", newCustomers: 350, returningCustomers: 800 },
  { month: "November", newCustomers: 250, returningCustomers: 650 },
  { month: "December", newCustomers: 300, returningCustomers: 700 },
];

const pieData1 = [
  { name: "Completed", value: 70 }, // Representing percentage
  { name: "Remaining", value: 30 },
];

const pieData2 = [
  { name: "Completed", value: 25 }, // Representing percentage
  { name: "Remaining", value: 75 },
];

// Routes
app.get("/api/hourlydata", (req, res) => {
  res.json(hourlyData);
});

app.get("/api/weeklydata", (req, res) => {
  res.json(weeklyData);
});

app.get("/api/recentbookings", (req, res) => {
  res.json(recentBookings);
});

app.get("/api/topservices", (req, res) => {
  res.json(topServices);
});

//users
// get stats
app.get("/api/all", (req, res) => {
  totalNumber = userData.length;
  totalNumberActive = userData.filter(user => user.status === "Active").length;
  totalNumberInactive = userData.filter(user => user.status === "Inactive").length;
  totalNumberSuspended = totalNumber - totalNumberActive - totalNumberInactive;
  res.json({
    totalNumber,
    totalNumberActive,
    totalNumberInactive,
    totalNumberSuspended
  });
})

//get all users
app.get("/api/users", (req, res) => {
  const resultsPerPage = 10;
  
  try {
      const apiFeatures = new ApiFeatures(userData, req.query)
          .filter()
          .pagination(resultsPerPage);

      
      res.status(200).json({
          success: true,
          users: apiFeatures.data,
          totalUsers: userData.length,
          page: req.query.page || 1,
          totalPages: Math.ceil(userData.length / resultsPerPage)
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: "An error occurred while fetching users",
          error: error.message
      });
  }
});

//adding new user
app.post("/api/user/add", (req,res) => {
  let { userId, firstName, secondName, email, phoneNumber, address, city, apartment, country, postalCode, notes } = req.body;
  userId = userData.length > 0 ? userData[userData.length-1].userId + 1 : 1;
  const name = firstName+secondName
  address = apartment+" "+address+" "+city+" "+country+" "+postalCode;

  const newUser = {userId, email, name, phoneNumber, status: "Active", dateJoined: "29/10/24"}
  userData.push(newUser);
  res.json(newUser);
})

//delete selected users
app.post("/api/user/delete", (req, res) => {
  const { userIds } = req.body;
  console.log(userIds);
  userData = userData.filter(user => !userIds.includes(user.userId));

  res.json(userData);
})

//basic filter for users (not used)
app.get("/api/user/filter", (req, res) => {
  const { status } = req.query;
  const result = userData.filter(user => user.status=== status);
  res.json({result, size: result.length})
})

app.get("/api/orders/:userId", (req, res) => {
  try{
    const userId = Number(req.params.userId);
    const userOrders = orders.filter(order => order.userId === userId);
    const user = userData.find((user) => user.userId === userId);

    if (user){
      if (userOrders.length>0){
        res.json({
          success: true,
          user,
          orders: userOrders,
          numOfOrders: userOrders.length
        })
      } else {
        res.json({
          success: false,
          message: "No orders found for this user",
          })
      }
    } else {
      res.json({
        success: false,
        message: "User not found",
      })
    }
  } catch(err){
    console.error(err);
    res.json({message: err})
  }
})

app.get("/api/user/:id/tags", (req, res) => {
  try{
    const id = Number(req.params.id);
    const user = userData.find(user => user.userId === id);
    if (user){
      res.json({tags: user.tags || []})
    }
  } catch(error){
    console.error(error)
    res.json({error})
  }
})

app.post("/api/user/:id/tags", (req, res) => {
  try {
    const id = Number(req.params.id);
    const { tags } = req.body;
    const user = userData.find(user => user.userId === id);
  
    if (user) {
      user.tags = user.tags || [];
      
      tags.forEach(tag => {
        if (!user.tags.includes(tag)) {
          user.tags.push(tag);
        }
      });
      res.json({ message: "Tags added successfully", tags: user.tags, user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//deleting tags
app.delete("/api/user/:id/tags", (req, res) => {
  try {
    const id = Number(req.params.id);
    const { tag } = req.body;

    const user = userData.find(user => user.userId === id);
    if (user) {
      user.tags = user.tags.filter(t => t !== tag);
      res.json({ message: "Tag deleted successfully", tags: user.tags });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//delete user by id
app.delete("/api/user/:id", (req, res) => {
  const id = Number(req.params.id);
  try {
    const userIndex = userData.findIndex(user => user.userId === id);
    if (userIndex !== -1) {
      userData.splice(userIndex, 1);
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//edit user data by id
app.patch("/api/user/:id", (req, res) => {
  const id = Number(req.params.id);
  const updates = req.body;

  const userIndex = userData.findIndex(user => user.userId === id);

  if (userIndex===-1){
    res.status(404).json({message: "User not found"})
  }

  userData[userIndex] = {
    ...userData[userIndex],
    ...updates
  }

  res.status(200).json({message: "Data updated successfully", user: userData[userIndex]})
})

//partner's section
//get partner stats
app.get("/api/partner/stats", (req, res) => {
  totalNumber = partnerData.length;
  totalNumberActive = partnerData.filter(partner => partner.status === "Active").length;
  totalNumberInactive = partnerData.filter(partner => partner.status === "Inactive").length;
  totalNumberSuspended = totalNumber - totalNumberActive - totalNumberInactive;
  res.json({
    totalNumber,
    totalNumberActive,
    totalNumberInactive,
    totalNumberSuspended
  });
})

app.get("/api/partners/all", (req, res) => {
  const resultsPerPage = 10;
  
  try {
      const apiFeatures = new ApiFeatures(partnerData, req.query)
          .filter()
          .pagination(resultsPerPage);

      
      res.status(200).json({
          success: true,
          partners: apiFeatures.data,
          totalUsers: partnerData.length,
          page: req.query.page || 1,
          totalPages: Math.ceil(partnerData.length / resultsPerPage)
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: "An error occurred while fetching users",
          error: error.message
      });
  }
});

//delete selected partners
app.post("/api/partners/delete", (req, res) => {
  const { partnerIds } = req.body;
  // console.log(partnerIds);
  partnerData = partnerData.filter(partner => !partnerIds.includes(partner.partnerId));

  res.json(userData);
})

//partners' information
app.get("/api/partner/info/:id", (req, res) => {
  try{
    const partnerId = Number(req.params.id);
    const partnerOrders = orders.filter(order => order.userId === partnerId);
    const services = serviceData.filter(service => service.partnerId === partnerId);
    const packages = packageData.filter(service => service.partnerId === partnerId);
    const partner = partnerData.find(partner => partner.partnerId === partnerId);

    if (partner){
      res.json({
        success:true,
        partner,
        orders: partnerOrders,
        numOfOrders: partnerOrders.length,
        serviceData: services,
        packageData: packages
      })
    } else {
      res.status(404).json({
        success: false,
        message: "Partner not found"
      })
    }

  } catch(err){
    console.error(err);
  }
})

//delete one partner at  time
app.delete("/api/partner/:id", (req, res) => {
  const partnerId = Number(req.params.id);
  try{
    const index = partnerData.findIndex(partner => partner.partnerId === partnerId);
    if (index !== -1) {
      partnerData.splice(index, 1);
      res.json({
        success: true,
        message: "Partner deleted successfully"
      })
      } else {
        res.status(404).json({
          success: false,
          message: "Partner not found"
        })
      }
  } catch(err){
    console.error(err)
  }
})

//editing additional information for partner
app.patch("/api/partner/:id", (req, res) => {
  const partnerId = Number(req.params.id);
  const updates = req.body;
  const index = partnerData.findIndex(partner => partner.partnerId === partnerId);

  if (index === -1){
    res.status(404).json({message: "Partner Not found"})
  }
  partnerData[index] = {
    ...partnerData[index],
    ...updates
  }

  res.status(200).json({message: "Data updated successfully", partner: partnerData[index]})
})

//appointments
//fetching data for appointments
app.get("/api/appointments", (req, res) => {
  const resultsPerPage = 10;

  try{
    const apiFeatures = new ApiFeatures(appointmentsData, req.query)
      .filter()
      .pagination(resultsPerPage);
    
    appointmentsData.amount = 100;

    res.status(200).json({
      success: true,
      appointments: apiFeatures.data,
      totalAppointments: appointmentsData.length,
      page: req.query.page || 1,
      totalPages: Math.ceil(appointmentsData.length/resultsPerPage)
    });

  } catch(err){
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message
    })
  }
})

app.get("/api/appointments/stats", (req, res) => {
  let totalNumber = appointmentsData.length;
  let totalNumberActive = appointmentsData.filter(appointment => appointment.status==="Active").length;
  let totalNumberScheduled = appointmentsData.filter(appointment=>appointment.status==="Scheduled").length;
  let totalNumberNew = appointmentsData.filter(appointment=>appointment.status==="New").length;
  let totalNumberCancelled = totalNumber-totalNumberActive-totalNumberScheduled-totalNumberNew;

  res.json({
    totalNumber,
    totalNumberActive,
    totalNumberScheduled,
    totalNumberNew,
    totalNumberCancelled,
  })
})

//delete selected appointments
app.post("/api/appointments/delete", (req, res) => {
  const {appointmentIds} = req.body;
  appointmentsData = appointmentsData.filter(appointment => !appointmentIds.includes(appointment.appointmentId));
  res.json(appointmentsData);
})


//disputes
app.get("/api/disputes", (req, res) => {
  const resultsPerPage = 10;

  try{
    const apiFeatures = new ApiFeatures(disputeData, req.query)
      .filter()
      .pagination(resultsPerPage);
    
    disputeData.amount = 100;

    res.status(200).json({
      success: true,
      disputes: apiFeatures.data,
      totalDisputes: disputeData.length,
      page: req.query.page || 1,
      totalPages: Math.ceil(disputeData.length/resultsPerPage)
    });

  } catch(err){
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message
    })
  }
})

app.get("/api/disputes/stats", (req, res) => {
  let totalNumber = disputeData.length;
  let totalNumberResolved = disputeData.filter(appointment => appointment.status==="Resolved").length;
  let totalNumberInProgress = disputeData.filter(appointment=>appointment.status==="Inprogress").length;
  let totalNumberNew = totalNumber - totalNumberResolved - totalNumberInProgress;

  res.json({
    totalNumber,
    totalNumberResolved,
    totalNumberInProgress,
    totalNumberNew,
  })
})

//delete selected appointments
app.post("/api/disputes/delete", (req, res) => {
  const {disputeIds} = req.body;
  disputeData = disputeData.filter(dispute => !disputeIds.includes(dispute.disputeId));
  res.json(disputeData);
})

app.get("/api/disputes/latest", (req, res) => {
  res.json(disputeData[0]);
})

app.get("/api/chat/disputes", (req, res) => {
  const disputes = [...new Set(messageData.map(message => message.disputeId))];
  const allDisputes = disputeData.filter(dispute => disputes.includes(dispute.disputeId));
  res.json(allDisputes);
})

app.get("/api/chats", (req, res) => {
  const disputeId = Number(req.query.disputeId);
  const chats = messageData.filter(message => message.disputeId === disputeId);
  res.json(chats)
})

app.post("/api/chats", (req, res) => {
  const {disputeId, text} = req.body;
  if (!disputeId || !text) {
    return res.status(400).json({ success: false, error: "Missing required fields"});
  }

  const dispute = disputeData.find(dispute => dispute.disputeId === disputeId);
  if (!dispute){
    return res.status(404).json({ success: false, error: "Dispute not found"});
  }

  const newMessage = {
    messageId: messageData.length + 1,
    disputeId,
    text,
    receiverId: dispute.userId,
    senderId: 0,
    createdAt: new Date().toISOString()
  }
  messageData.push(newMessage);
  res.json(newMessage);
})

//reports
app.get("/api/monthlyReports", (req, res) => {
  res.json(customerMonthlyData);
})

app.get("/api/pieData/1", (req, res) => {
  res.json(pieData1)
})

app.get("/api/pieData/2", (req, res) => {
  res.json(pieData2)
})

app.get("/api/topcustomers", (req, res) => {
  res.json(topCustomers)
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
