# Q&A Collection System

A complete web application for collecting descriptive Q&A responses with automatic data persistence to Google Sheets.

## 🚀 Quick Start

1. **Open `index.html`** in any web browser - it works immediately with local storage
2. **For production use**: Follow the setup instructions in `SETUP_INSTRUCTIONS.md`

## 📁 Project Structure

```
├── index.html              # Main web application (frontend)
├── google-apps-script.js   # Google Apps Script backend code
├── sample-questions.js     # Template with 40 sample questions
├── SETUP_INSTRUCTIONS.md   # Detailed setup guide
└── README.md              # This file
```

## ✨ Features

### Frontend
- 🎨 Modern, responsive design
- 📱 Mobile-friendly interface
- ✅ Input validation and error handling
- ⌨️ Keyboard navigation support
- 🔄 Loading states and feedback

### Backend
- 📊 Google Sheets integration
- 💾 Automatic data persistence
- 📈 No data loss (append-only storage)
- 📤 Export capabilities
- 🔒 Secure data handling

### Data Structure
Each response includes:
- **Timestamp** - When submitted
- **Question Code** - Unique identifier (Q101, Q102, etc.)
- **Question Text** - Full question
- **Answer 1, 2, 3** - Three descriptive responses

## 🛠️ Setup Options

### Option 1: Quick Demo (5 minutes)
1. Open `index.html` in a browser
2. Start collecting responses (stored locally)
3. Perfect for testing and demos

### Option 2: Full Production (15 minutes)
1. Follow `SETUP_INSTRUCTIONS.md`
2. Set up Google Sheets backend
3. Deploy for production use

## 📝 Customization

### Adding Your Questions
1. Open `sample-questions.js`
2. Replace the sample questions with your own
3. Copy the updated object to `index.html`

### Styling
- Modify CSS in the `<style>` section of `index.html`
- Colors, fonts, and layout are easily customizable

## 🔧 Technical Details

### Frontend Technologies
- **HTML5** - Structure
- **CSS3** - Styling with modern features
- **Vanilla JavaScript** - No frameworks required

### Backend Technologies
- **Google Apps Script** - Serverless backend
- **Google Sheets** - Data storage
- **JSON API** - Data communication

### Browser Support
- ✅ Chrome, Firefox, Safari, Edge
- ✅ Mobile browsers
- ✅ Works offline (with local storage)

## 📊 Data Management

### Viewing Responses
- Open your Google Sheet
- Check the "QAResponses" tab
- All data is automatically organized

### Exporting Data
- **CSV/Excel**: Direct from Google Sheets
- **API**: Use Apps Script functions
- **Email**: Automated exports (configurable)

## 🚨 Troubleshooting

### Common Issues
1. **Question not found** - Check question code format
2. **Submission failed** - Verify internet connection and API URL
3. **Data not appearing** - Run setup function in Apps Script

### Support
- Check browser console for errors
- Verify Google Apps Script deployment
- Test with simple question codes first

## 🔒 Security & Privacy

- No authentication included (add if needed)
- Data stored in Google Sheets (Google's security)
- No sensitive data exposure
- CORS properly configured

## 📈 Performance

- Works offline with local storage
- Handles thousands of responses
- Optimized for fast question lookups
- Minimal server load

## 🎯 Use Cases

- **Employee Surveys** - Collect feedback and insights
- **Research Studies** - Gather qualitative data
- **Training Assessments** - Evaluate learning outcomes
- **Customer Feedback** - Understand user needs
- **Academic Research** - Collect participant responses

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review `SETUP_INSTRUCTIONS.md`
3. Test with the demo version first

---

**Ready to collect responses!** 🎉

Open `index.html` to start using your Q&A collection system immediately.
