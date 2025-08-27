const express = require('express');
const router = express.Router();

// Sample stores data
const stores = [
  {
    id: 1,
    name: "DELHI STORE",
    address: "M-81, Ground floor, M block market, Greater Kailash II, Delhi 110048",
    phone: "+91 9599191998",
    city: "Delhi",
    coordinates: { lat: 28.5275, lng: 77.2519 },
    hours: {
      monday: "11:00 AM - 9:00 PM",
      tuesday: "11:00 AM - 9:00 PM",
      wednesday: "11:00 AM - 9:00 PM",
      thursday: "11:00 AM - 9:00 PM",
      friday: "11:00 AM - 9:00 PM",
      saturday: "11:00 AM - 9:00 PM",
      sunday: "12:00 PM - 8:00 PM"
    }
  },
  {
    id: 2,
    name: "MUMBAI STORE",
    address: "B1, Prem Sagar Building, 14th Rd, Khar, Khar West, Mumbai, Maharashtra 400052",
    phone: "+91 9599199537",
    city: "Mumbai",
    coordinates: { lat: 19.0760, lng: 72.8777 },
    hours: {
      monday: "11:00 AM - 9:00 PM",
      tuesday: "11:00 AM - 9:00 PM",
      wednesday: "11:00 AM - 9:00 PM",
      thursday: "11:00 AM - 9:00 PM",
      friday: "11:00 AM - 9:00 PM",
      saturday: "11:00 AM - 9:00 PM",
      sunday: "12:00 PM - 8:00 PM"
    }
  },
  {
    id: 3,
    name: "HYDERABAD STORE",
    address: "101, Vimbri Boulevard, Street No. 4, Green Valley, Banjara Hills, Hyderabad, Telangana 500034",
    phone: "+91 95991 98004",
    city: "Hyderabad",
    coordinates: { lat: 17.3850, lng: 78.4867 },
    hours: {
      monday: "11:00 AM - 9:00 PM",
      tuesday: "11:00 AM - 9:00 PM",
      wednesday: "11:00 AM - 9:00 PM",
      thursday: "11:00 AM - 9:00 PM",
      friday: "11:00 AM - 9:00 PM",
      saturday: "11:00 AM - 9:00 PM",
      sunday: "12:00 PM - 8:00 PM"
    }
  },
  {
    id: 4,
    name: "AHMEDABAD STORE",
    address: "One42, G10, 11ABC Ln, Ashok Vatika, Ahmedabad, Gujarat 380058",
    phone: "+91 92668 66286",
    city: "Ahmedabad",
    coordinates: { lat: 23.0225, lng: 72.5714 },
    hours: {
      monday: "11:00 AM - 9:00 PM",
      tuesday: "11:00 AM - 9:00 PM",
      wednesday: "11:00 AM - 9:00 PM",
      thursday: "11:00 AM - 9:00 PM",
      friday: "11:00 AM - 9:00 PM",
      saturday: "11:00 AM - 9:00 PM",
      sunday: "12:00 PM - 8:00 PM"
    }
  },
  {
    id: 5,
    name: "GURUGRAM STORE",
    address: "F-149, First Floor, Ambience Mall, NH- 8, Sector 24, Gurugram, Haryana 122002",
    phone: "+91 92668 66296",
    city: "Gurugram",
    coordinates: { lat: 28.4595, lng: 77.0266 },
    hours: {
      monday: "11:00 AM - 9:00 PM",
      tuesday: "11:00 AM - 9:00 PM",
      wednesday: "11:00 AM - 9:00 PM",
      thursday: "11:00 AM - 9:00 PM",
      friday: "11:00 AM - 9:00 PM",
      saturday: "11:00 AM - 9:00 PM",
      sunday: "12:00 PM - 8:00 PM"
    }
  }
];

// GET /api/stores - Get all stores
router.get('/', async (req, res) => {
  try {
    const { city } = req.query;
    
    let filteredStores = [...stores];
    
    if (city) {
      filteredStores = filteredStores.filter(store => 
        store.city.toLowerCase() === city.toLowerCase()
      );
    }

    res.json({
      success: true,
      data: filteredStores
    });
  } catch (error) {
    console.error('Error fetching stores:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch stores' 
    });
  }
});

// GET /api/stores/:id - Get single store
router.get('/:id', async (req, res) => {
  try {
    const storeId = parseInt(req.params.id);
    const store = stores.find(s => s.id === storeId);

    if (!store) {
      return res.status(404).json({ 
        success: false, 
        error: 'Store not found' 
      });
    }

    res.json({
      success: true,
      data: store
    });
  } catch (error) {
    console.error('Error fetching store:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch store' 
    });
  }
});

// GET /api/stores/city/:city - Get stores by city
router.get('/city/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const cityStores = stores.filter(store => 
      store.city.toLowerCase() === city.toLowerCase()
    );

    res.json({
      success: true,
      data: cityStores
    });
  } catch (error) {
    console.error('Error fetching stores by city:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch stores by city' 
    });
  }
});

module.exports = router; 