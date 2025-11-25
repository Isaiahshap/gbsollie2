# 📊 Google Analytics 4 Tracking Setup

## ✅ What's Been Implemented

### **Comprehensive Tracking Across All Funnel Pages:**
- ✅ Christmas Gift Page (`/christmas-gift`)
- ✅ Grandparents Page (`/grandparents`)  
- ✅ Mothers Page (`/mothers`)
- ✅ Librarians Page (`/librarian`)
- ✅ Youth Directors Page (`/youthdirectors`)

### **What's Being Tracked:**

1. **🎯 Amazon Purchase Clicks** - Every "Buy on Amazon" button
2. **📧 Newsletter Signups** - Modal opens and form submissions
3. **📍 Traffic Sources** - UTM parameters and referrers
4. **📜 Scroll Depth** - How far users scroll (25%, 50%, 75%, 100%)
5. **⏱️ Time on Page** - User engagement duration
6. **🔄 Funnel Page Views** - Entry into each funnel

---

## 🔍 How to View Your Data in Google Analytics

### **Step 1: Access Google Analytics**
1. Go to https://analytics.google.com
2. Select your property (G-S3XRD45CDY)

### **Step 2: View Amazon Click Conversions**

**Path:** Reports → Engagement → Events

**Filter for:**
- Event name: `amazon_click`

**What you'll see:**
- `button_location` - Where the button was clicked (e.g., "Grandparents Hero CTA", "Christmas Final CTA")
- `product_name` - Which book (Cat Luker: The Dark Clock)
- `page_path` - Which page they were on

**💡 Pro Tip:** Create a custom report to see Amazon clicks by page:
```
Dimensions: page_path, button_location
Metrics: Event count
Filter: Event name = amazon_click
```

### **Step 3: Track Newsletter Conversions**

**Path:** Reports → Engagement → Conversions

**Events to monitor:**
- `generate_lead` - Newsletter signup completed
- `modal_open` - User opened free preview modal
- `form_start` - User began filling out form
- `form_submit` - Form was submitted

**See conversion rate:**
1. Go to Reports → Engagement → Events
2. Mark `generate_lead` as a conversion (if not already)
3. View funnel: Modal Opens → Form Starts → Form Submits

### **Step 4: Analyze Traffic Sources**

**Path:** Reports → Acquisition → Traffic acquisition

**What to look for:**
- Which campaigns drive the most Amazon clicks
- Which sources convert best to newsletter signups
- UTM parameters from your marketing campaigns

**Create Custom UTM Links:**
```
Facebook Ad Example:
https://gbsollie.com/christmas-gift?utm_source=facebook&utm_medium=paid&utm_campaign=christmas2025

Email Campaign Example:
https://gbsollie.com/grandparents?utm_source=email&utm_medium=newsletter&utm_campaign=grandparents_promo
```

### **Step 5: View Funnel Performance**

**Create a Custom Exploration:**

1. Go to **Explore** → **Create new exploration**
2. Choose **Funnel exploration**
3. Set up your funnel:

```
Step 1: funnel_view (Christmas Page)
Step 2: button_click (Any CTA)  
Step 3: amazon_click (Purchase intent)

OR

Step 1: funnel_view (Any funnel page)
Step 2: modal_open (Free preview)
Step 3: form_start (Began signup)
Step 4: generate_lead (Completed signup)
```

### **Step 6: Compare Funnel Pages**

**Which page converts best?**

1. Go to **Reports** → **Engagement** → **Pages and screens**
2. Add secondary dimension: **Event name**
3. Filter for your funnel pages:
   - `/christmas-gift`
   - `/grandparents`
   - `/mothers`
   - `/librarian`
   - `/youthdirectors`
4. Compare `amazon_click` counts per page

---

## 📈 Key Metrics to Monitor

### **Daily/Weekly:**
1. **Amazon Click Rate** - amazon_click events / page views
2. **Newsletter Conversion Rate** - generate_lead / modal_open
3. **Scroll Depth** - Average scroll percentage per page

### **Monthly:**
1. **Best Performing Funnel** - Which page drives most clicks
2. **Traffic Source ROI** - Which campaigns convert best
3. **Drop-off Points** - Where users leave the funnel

---

## 🎯 Custom Reports to Create

### **Report 1: Amazon Clicks by Page**
```
Dimensions: page_path, button_location
Metrics: amazon_click (event count)
Filter: Event name = amazon_click
Sort by: Event count (descending)
```

**What it shows:** Which pages and which buttons get the most Amazon clicks

### **Report 2: Newsletter Funnel**
```
Step 1: modal_open
Step 2: form_start  
Step 3: generate_lead

Breakdown by: page_path
```

**What it shows:** Conversion rate from modal open to signup by page

### **Report 3: Traffic Source Performance**
```
Dimensions: utm_source, utm_campaign, utm_medium
Metrics: amazon_click, generate_lead
```

**What it shows:** Which marketing campaigns drive actual conversions

### **Report 4: Button Performance**
```
Dimensions: button_name, button_location
Metrics: Event count
Filter: Event name = button_click
```

**What it shows:** Which specific buttons get clicked most

---

## 🔗 Setting Up UTM Parameters

### **For Social Media Posts:**
```
Christmas Campaign:
https://gbsollie.com/christmas-gift?utm_source=facebook&utm_medium=social&utm_campaign=christmas_2025

https://gbsollie.com/christmas-gift?utm_source=instagram&utm_medium=social&utm_campaign=christmas_2025
```

### **For Email Campaigns:**
```
Grandparents Newsletter:
https://gbsollie.com/grandparents?utm_source=newsletter&utm_medium=email&utm_campaign=grandparents_special

Mothers Email:
https://gbsollie.com/mothers?utm_source=newsletter&utm_medium=email&utm_campaign=mothers_day
```

### **For Paid Ads:**
```
Google Ads:
https://gbsollie.com/christmas-gift?utm_source=google&utm_medium=cpc&utm_campaign=christmas_shopping

Facebook Ads:
https://gbsollie.com/grandparents?utm_source=facebook&utm_medium=paid&utm_campaign=grandparents_targeting
```

---

## 📊 Dashboard Setup (Recommended)

### **Create a Custom Dashboard with:**

1. **Conversion Overview Card**
   - Total Amazon clicks (this month)
   - Total newsletter signups (this month)
   - Conversion rate trend

2. **Funnel Performance Card**
   - Christmas page: Amazon clicks
   - Grandparents page: Amazon clicks
   - Mothers page: Amazon clicks
   - Librarians page: Amazon clicks
   - Youth Directors page: Amazon clicks

3. **Traffic Sources Card**
   - Top 5 sources by Amazon clicks
   - Top 5 sources by newsletter signups

4. **Real-Time Activity**
   - Current active users on funnel pages
   - Recent Amazon click events

---

## 🎓 Understanding Event Parameters

### **amazon_click Event:**
- `product_name` - "Cat Luker: The Dark Clock"
- `button_location` - Where clicked (e.g., "Christmas Hero CTA", "Grandparents After Social Proof")
- `page_path` - Which page (`/christmas-gift`, `/grandparents`, etc.)

### **modal_open Event:**
- `modal_name` - "Free Preview"
- `trigger_element` - What triggered it (e.g., "Christmas Hero CTA", "Bible Study Bonus")
- `page_path` - Which page

### **generate_lead Event:**
- `lead_type` - "newsletter"
- `signup_location` - Title of modal/form
- `page_path` - Where they signed up

### **funnel_view Event:**
- `funnel_name` - "Christmas Gift", "Grandparents", etc.
- `funnel_step` - "Landing Page"
- `step_number` - 1

---

## 🚀 Advanced: Setting Up Conversion Goals

### **In GA4, mark these as Key Events (Conversions):**

1. `amazon_click` - High-intent purchase action
2. `generate_lead` - Newsletter signup
3. `purchase_intent` - Tracked with Amazon clicks

**How to do it:**
1. Go to Admin → Events
2. Find the event (`amazon_click`, `generate_lead`)
3. Toggle "Mark as conversion"

**Now you can:**
- See conversion value in reports
- Use in Google Ads for optimization
- Track ROI per campaign

---

## 📱 Real-Time Monitoring

**Path:** Reports → Realtime

**What to watch:**
- Users currently on funnel pages
- Amazon clicks happening right now
- Newsletter signups in real-time

**Great for testing:**
- Launch a campaign
- Watch the real-time dashboard
- See clicks/conversions immediately

---

## 💡 Pro Tips

### **1. A/B Test Your Funnels**
Compare performance:
- Christmas page vs. Grandparents page
- Different button locations
- Different traffic sources

### **2. Set Up Alerts**
Get notified when:
- Amazon clicks spike (successful campaign!)
- Clicks drop significantly (something's wrong)
- Newsletter signups increase

### **3. Export Data**
- Go to any report → Share → Download file
- Get CSV for deeper analysis in Excel
- Create custom charts and presentations

### **4. Connect Google Ads**
- Link GA4 to Google Ads
- Use `amazon_click` as conversion goal
- Optimize ad campaigns for actual purchase intent

---

## 🎯 Success Metrics to Track

### **Week 1:**
- Baseline Amazon click rate per page
- Baseline newsletter conversion rate
- Top traffic sources

### **Month 1:**
- Which funnel page performs best
- Which button locations get most clicks
- Best converting traffic sources

### **Quarter 1:**
- ROI per marketing channel
- Seasonal trends (Christmas spike!)
- Optimization opportunities

---

## 🆘 Troubleshooting

### **"I don't see any data"**
1. Check that GA4 is installed (it is: G-S3XRD45CDY)
2. Wait 24-48 hours for data to populate
3. Use Real-time reports to see immediate data

### **"Events aren't showing up"**
1. Open browser console (F12)
2. Look for gtag events being fired
3. Check that you're not blocking analytics with ad blockers

### **"UTM parameters not working"**
1. Make sure URL includes `?` before first parameter
2. Use `&` to separate multiple parameters
3. Don't use spaces or special characters

---

## 📞 Next Steps

1. **Create your first custom report** (Amazon clicks by page)
2. **Set up UTM parameters** for your next campaign
3. **Mark key events as conversions**
4. **Build a dashboard** for daily monitoring
5. **Export first month's data** to establish baseline

---

**Your GA4 ID:** `G-S3XRD45CDY`
**Implementation Date:** November 2025
**Status:** ✅ Fully Operational

Happy tracking! 📊🎉

