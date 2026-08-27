# 💊 Pharmacy Management System

A modern, responsive web application for managing pharmacy operations including patients, medicines, prescriptions, and receipts.

## 📋 About

The **Pharmacy Management System** is a comprehensive solution designed to streamline and simplify pharmacy operations. This system enables healthcare professionals and pharmacy staff to efficiently manage patient information, maintain medicine inventory, create and track prescriptions, and generate receipts.

### Key Capabilities:
- **Patient Management** - Add, view, and manage patient information (ID, name, address)
- **Medicine Inventory** - Track medicines with descriptions, quantities, and approval status
- **Prescription Handling** - Create prescriptions linking patients with medicines and doctor details
- **Receipt Generation** - Generate receipts with automatic total calculations
- **Data Persistence** - All data is stored in browser's localStorage for quick access

## ✨ Features

### User Interface
- 🎨 Modern gradient design with professional color scheme (blue to dark gray)
- 📱 Fully responsive layout optimized for mobile and desktop
- ⚡ Smooth animations and transitions throughout the app
- 🎯 Intuitive navigation with active state highlighting

### Core Functionality
- ✅ Full CRUD operations (Create, Read, Update, Delete)
- 📊 Professional data tables with hover effects
- 🔔 Toast notifications for user feedback (success/error)
- ✔️ Form validation with duplicate checking
- 🗑️ Delete confirmation dialogs
- 📭 Empty state messages when no data exists

### User Experience
- 🎯 Focus state styling for better form interaction
- 🖱️ Hover effects on buttons and table rows
- 📝 Auto-focus on form fields after save
- 🔖 Status badges for medicine approval (Green/Red)
- 💾 Persistent storage using localStorage

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with gradients, flexbox, and animations
- **JavaScript (Vanilla)** - No framework dependencies, pure JS controllers
- **Bootstrap 4** - Responsive grid and component library

### Libraries & Frameworks
- **AdminLTE** - Professional admin template styling
- **Font Awesome 5** - Icon library
- **jQuery** - DOM manipulation (optional)
- **Semantic UI** - Dropdown components

### Architecture
- **Layered Architecture** - Separation of concerns (View, Controller, Model)
- **MVC Pattern** - Model-View-Controller design pattern
- **Object-Oriented** - Clean, maintainable code structure
- **localStorage** - Client-side data persistence

## 📦 Project Structure

```
Pharmacy-Management/
├── index.html                 # Dashboard page
├── Patient.html              # Patient management page
├── Medicine.html             # Medicine inventory page
├── Prescription.html         # Prescription management page
├── Receipt.html              # Receipt generation page
├── Readme.md                 # Project documentation
└── dist/                     # Distribution folder
    ├── css/                  # Stylesheets
    │   ├── adminlte.min.css
    │   ├── font-awesome.min.css
    │   ├── semantic.min.css
    │   ├── Patient.css
    │   ├── Medicine.css
    │   ├── Prescription.css
    │   └── Receipt.css
    └── js/                   # JavaScript files
        ├── adminlte.js
        ├── plugins/
        │   ├── jquery/
        │   ├── jQueryUI/
        │   └── bootstrap/
        └── controller/
            ├── PatientNew.js
            ├── MedicineNew.js
            ├── PrescriptionNew.js
            └── ReceiptNew.js
```

## 🚀 Quick Start

### Installation
1. Clone the repository:
```bash
git clone https://github.com/CS-Ponkoj/Pharmacy-Management-2018.git
cd Pharmacy-Management
```

2. Open in browser:
- Simply open `index.html` in a modern web browser
- No server setup required for frontend-only version
- Uses browser's localStorage for data persistence

### Usage
1. **Navigate** using the sidebar menu
2. **Add Data** by filling out forms on each page
3. **View** data in tables below each form
4. **Delete** records using the delete button
5. **Save** automatically persists to browser storage

## 💾 Data Storage

All data is stored in the browser's **localStorage**:
- `patients` - Patient records
- `medicines` - Medicine inventory
- `prescriptions` - Prescription records
- `receipts` - Receipt records

Data persists across browser sessions until cleared.

## 🔄 Workflow

```
1. Add Patient → 2. Add Medicine → 3. Create Prescription → 4. Generate Receipt
```

**Example:**
- Patient P001 (John Smith) visits pharmacy
- Selects medicine M001 (Aspirin) in prescription
- Doctor adds prescription details
- System generates receipt with automatic total calculation

## 🎨 Design Features

### Color Scheme
- **Primary Blue**: `#3498db` - Main accent color
- **Dark Gray**: `#2c3e50` - Sidebar and headers
- **Success Green**: `#27ae60` - Approved status
- **Error Red**: `#e74c3c` - Pending/error status
- **Light Background**: `#ecf0f5` - Page background

### Responsive Breakpoints
- **Desktop**: 1024px and above
- **Tablet**: 768px to 1023px
- **Mobile**: Below 768px

## 🔐 Data Validation

- ✓ Required field validation
- ✓ Duplicate ID prevention
- ✓ Numeric input validation (price, quantity)
- ✓ Confirmation dialogs for deletions

## 📈 Recent Updates (v2.0)

### New in Latest Release:
- Complete UI overhaul with modern gradient design
- Enhanced form validation and error handling
- Toast notifications for all operations
- Status badges for better data visualization
- Smooth animations and transitions
- Responsive mobile-first design
- Professional sidebar navigation
- Empty state messages
- Delete confirmation dialogs
- Better visual feedback throughout

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

**Author:** CS-Ponkoj  
**Email:** csponkoj@gmail.com  
**Repository:** [CS-Ponkoj/Pharmacy-Management-2018](https://github.com/CS-Ponkoj/Pharmacy-Management-2018)

## 🙏 Acknowledgments

- Built with modern web standards (HTML5, CSS3, ES6 JavaScript)
- Inspired by pharmacy management best practices
- UI design based on AdminLTE professional template
- Icons from Font Awesome

---

**Last Updated:** August 26, 2026  
**Version:** 2.0 (Modern UI Release)
