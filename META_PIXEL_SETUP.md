# 🎯 Meta Pixel Setup Guide for Retargeting

## ✅ What's Been Implemented

Meta (Facebook) Pixel tracking is now installed on all your funnel pages and ready to power your Facebook & Instagram retargeting campaigns!

### **Pages with Meta Pixel:**
- ✅ Christmas Gift Page
- ✅ Grandparents Page
- ✅ Mothers Page
- ✅ Librarians Page
- ✅ Youth Directors Page
- ✅ All pages via root layout

### **Events Being Tracked:**

1. **PageView** - Standard page views
2. **ViewContent** - When someone visits a funnel page
3. **InitiateCheckout** - When someone clicks "Buy on Amazon"
4. **Lead** - When someone signs up for newsletter
5. **Custom Events:**
   - `AmazonClick` - Granular Amazon button tracking
   - `ModalOpen` - Free preview modal opens
   - `FormStart` - Newsletter form started
   - `FunnelView` - Funnel page visits
   - `DeepEngagement` - 75%+ scroll depth

---

## 🚀 Setup Steps

### **Step 1: Get Your Meta Pixel ID**

1. Go to **Meta Events Manager**: https://business.facebook.com/events_manager2
2. Click **Connect Data Sources** → **Web** → **Meta Pixel**
3. Name your pixel (e.g., "G.B. Sollie Website")
4. Click **Create Pixel**
5. Copy your **Pixel ID** (looks like: `123456789012345`)

### **Step 2: Add Pixel ID to Your Site**

Create a `.env.local` file in your project root (if it doesn't exist):

```bash
# .env.local
NEXT_PUBLIC_META_PIXEL_ID=YOUR_PIXEL_ID_HERE
```

Replace `YOUR_PIXEL_ID_HERE` with your actual Pixel ID.

**Example:**
```
NEXT_PUBLIC_META_PIXEL_ID=123456789012345
```

### **Step 3: Deploy to Vercel**

Add the environment variable in Vercel:

1. Go to your **Vercel dashboard**
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Key:** `NEXT_PUBLIC_META_PIXEL_ID`
   - **Value:** Your Pixel ID
   - **Environment:** Production, Preview, Development (check all)
5. Click **Save**
6. **Redeploy** your site

### **Step 4: Verify It's Working**

1. Install **Meta Pixel Helper** Chrome extension
2. Visit your live site
3. Click the extension icon
4. Should show: ✅ Pixel found, PageView event

Or in Facebook Events Manager:
1. Go to **Test Events** tab
2. Enter your website URL
3. Click buttons and fill forms
4. See events appear in real-time!

---

## 🎯 Creating Retargeting Audiences

### **Audience 1: Amazon Clickers (High Intent)**

**These people clicked to buy but didn't purchase yet**

1. Go to **Ads Manager** → **Audiences**
2. Click **Create Audience** → **Custom Audience** → **Website**
3. Choose: **People who visited specific web pages**
4. Set rules:
   - **Event:** InitiateCheckout
   - **Time:** Last 30 days
5. Name it: "Amazon Button Clickers - 30 Days"

**Use for:** 
- Retarget with Amazon ads
- Offer free shipping reminder
- Limited-time discount campaigns

### **Audience 2: Christmas Page Visitors**

**People who viewed your Christmas gift page**

1. Create Custom Audience → Website
2. **URL Contains:** `/christmas-gift`
3. **Time:** Last 30 days
4. Name it: "Christmas Gift Page Visitors"

**Use for:**
- Christmas-themed retargeting ads
- "Still looking for the perfect gift?" messaging
- Last-minute Christmas deals

### **Audience 3: Engaged Users (Scroll + Time)**

**People who scrolled 75%+ (seriously interested)**

1. Create Custom Audience → Website
2. **Event:** DeepEngagement
3. **Time:** Last 30 days
4. Name it: "Deeply Engaged Visitors"

**Use for:**
- Higher quality audience
- Worth spending more per click
- More aggressive messaging

### **Audience 4: Modal Openers (Didn't Convert)**

**Opened free preview but didn't signup**

1. Create Custom Audience → Website
2. **Event:** ModalOpen
3. **Exclude:** People who completed Lead event
4. **Time:** Last 7 days
5. Name it: "Modal Opened - No Signup"

**Use for:**
- "Don't miss out on your free guide!"
- Quick retarget while still warm
- Offer incentive to complete signup

### **Audience 5: Funnel-Specific Audiences**

**Target specific demographics:**

**Grandparents Audience:**
- URL Contains: `/grandparents`
- Perfect for grandparent-focused messaging

**Mothers Audience:**
- URL Contains: `/mothers`
- Mother's Day campaigns, mom-focused ads

**Youth Directors Audience:**
- URL Contains: `/youthdirectors`
- Church/ministry focused retargeting

**Librarians Audience:**
- URL Contains: `/librarian`
- Educational/classroom messaging

### **Audience 6: Lookalike Audiences**

**Once you have 100+ conversions:**

1. Create **Lookalike Audience** from "Amazon Button Clickers"
2. Choose location: United States
3. Choose size: 1% (most similar)
4. Name it: "Lookalike - Amazon Clickers 1%"

**Use for:**
- Finding new customers similar to your buyers
- Expand reach beyond warm audiences
- Scale successful campaigns

---

## 📱 Sample Retargeting Campaigns

### **Campaign 1: Amazon Clickers Retargeting**

**Audience:** Amazon Button Clickers - 30 Days

**Ad Copy:**
```
Still thinking about Cat Luker? 🎄

Give the gift of adventure and faith this Christmas!

Perfect for ages 9-13 | 880L Reading Level | Biblical themes

Order now with FREE Prime shipping! 📚✨
```

**Destination:** Your Amazon link or `/christmas-gift` page

**Budget:** $10-20/day to start

---

### **Campaign 2: Christmas Gift Reminder**

**Audience:** Christmas Gift Page Visitors (exclude Amazon clickers)

**Ad Copy:**
```
The Perfect Christmas Gift for Kids 9-13! 🎁

Cat Luker combines magical adventure with biblical values.

Grandparents & parents: Give a gift they'll remember forever!

📖 Free sample chapter + Bible study guide available
```

**Destination:** `/christmas-gift`

**Budget:** $15-25/day (seasonal)

---

### **Campaign 3: Free Preview to Lead**

**Audience:** Modal Opened - No Signup (last 7 days)

**Ad Copy:**
```
Don't Miss Your Free Bible Study Guide! 📖

You showed interest - here's your free chapter + study guide.

Perfect for youth groups, families, and Sunday school!

Download now (no purchase required) ✨
```

**Destination:** `/christmas-gift` or `/grandparents` with modal pre-opened

**Budget:** $5-10/day

---

### **Campaign 4: Lookalike Expansion**

**Audience:** Lookalike - Amazon Clickers 1%

**Ad Copy:**
```
The #1 Christian Adventure Book Parents Are Gifting This Year 🌟

Cat Luker: The Dark Clock brings faith to life for kids 9-13.

Time-travel adventure meets biblical lessons in this beautifully illustrated series.

Perfect for Christmas, birthdays, or "just because" 🎁
```

**Destination:** `/books` or `/christmas-gift`

**Budget:** $20-50/day (scale up if profitable)

---

## 📊 Monitoring Your Pixel

### **In Facebook Events Manager:**

1. **Overview Tab:**
   - See total events (last 28 days)
   - Event breakdown by type
   - Top events by volume

2. **Data Sources Tab:**
   - Pixel status (Active/Inactive)
   - Events received
   - Last activity

3. **Test Events Tab:**
   - Real-time event testing
   - See events as they fire
   - Debug tracking issues

### **Verify Specific Events:**

**Check InitiateCheckout (Amazon clicks):**
1. Go to Events Manager
2. Click on your Pixel
3. Find "InitiateCheckout" in event list
4. Click to see details: button_location, product_name, etc.

**Check Lead (Newsletter signups):**
1. Find "Lead" event
2. See signup_location parameter
3. Track conversion rate

---

## 🎨 Ad Creative Best Practices

### **For Amazon Clicker Retargeting:**
- Use book cover image prominently
- Include price/Amazon Prime mention
- Create urgency ("Limited stock", "Perfect for Christmas")
- Show 5-star ratings/reviews if available

### **For Funnel Page Visitors:**
- Show lifestyle images (kids reading, family time)
- Highlight biblical themes
- Use testimonials from parents/grandparents
- Include "Free preview" offer

### **For Modal Openers:**
- Direct messaging: "You started - finish now!"
- Show what they'll get (Bible study guide cover)
- Remove friction: "Takes 30 seconds"
- Social proof: "Join 500+ subscribers"

---

## 💰 Budget Recommendations

### **Starting Budget Allocation:**
```
Total Monthly Budget: $500

$200 - Amazon Clicker Retargeting (40%)
$150 - Christmas/Seasonal Campaigns (30%)
$100 - Lookalike Audiences (20%)
$50  - Modal Openers Quick Retarget (10%)
```

### **Scaling Strategy:**

**Week 1-2:**
- Test small budgets ($5-10/day per campaign)
- Monitor Cost Per Click (CPC)
- Track Cost Per Amazon Click

**Week 3-4:**
- 2x budget on winning campaigns
- Pause underperformers
- Create lookalike audiences

**Month 2+:**
- Scale proven winners
- Test new ad creatives
- Expand to new audience segments

---

## 🔄 Retargeting Exclusions (Important!)

**Exclude people who already:**
1. **Clicked Amazon multiple times** (they already bought or decided not to)
2. **Signed up for newsletter** (move to email nurture instead)
3. **Visited in last 1 day** (too soon, wait 2-3 days)

**How to exclude:**
1. In audience creation, add "Exclude" rule
2. Choose event: InitiateCheckout
3. Time: Last 1 day
4. Frequency: More than 3 times

This prevents wasted ad spend on people already converted!

---

## 📈 Optimization Tips

### **1. Frequency Capping**
- Max 3-5 impressions per person per week
- Prevents ad fatigue
- Set in campaign settings

### **2. Timing**
- Retarget 2-7 days after visit (sweet spot)
- For Christmas: retarget within 24 hours (urgency!)
- For general: wait 3-5 days

### **3. Progressive Messaging**
```
Day 1-2:  "Still thinking about it?"
Day 3-5:  "Here's why parents love it..."
Day 6-7:  "Last chance - limited stock!"
```

### **4. Creative Refresh**
- Change ad creative every 7-14 days
- Prevents banner blindness
- Test different angles

---

## 🎁 Seasonal Retargeting (Christmas Example)

### **November 15 - December 10:**
**Audience:** Christmas Page Visitors + Amazon Clickers
**Message:** "Perfect gift for ages 9-13!"
**Urgency:** "Order now for Christmas delivery"
**Budget:** $30/day

### **December 11-20:**
**Audience:** Same but more aggressive
**Message:** "LAST CHANCE for Christmas!"
**Urgency:** "Order by Dec 18 for guaranteed delivery"
**Budget:** $50/day (increase)

### **December 21-24:**
**Audience:** Modal openers (digital gift angle)
**Message:** "Last-minute gift idea: Send digital gift card + preview chapter!"
**Budget:** $20/day

---

## 🔍 Tracking ROI

### **Calculate Cost Per Amazon Click:**
```
Ad Spend ÷ InitiateCheckout Events = Cost Per Click
```

**Example:**
- Spent $100 on retargeting
- Got 25 Amazon clicks (InitiateCheckout events)
- Cost per click: $4

**Is that good?**
- If book is $15.99 and 20% buy → $3.20 per sale
- Break-even at ~$3.20 per Amazon click
- $4 is close - optimize or test other audiences

### **Track Full Funnel:**
```
Ad Impressions → Page Visits → Amazon Clicks → Actual Purchases
```

Use GA4 + Meta Pixel together for complete picture!

---

## 🚀 Quick Start Checklist

**Today:**
- [ ] Get Meta Pixel ID from Facebook
- [ ] Add to `.env.local` file
- [ ] Add to Vercel environment variables
- [ ] Deploy and verify with Pixel Helper

**This Week:**
- [ ] Create "Amazon Clickers" audience
- [ ] Create "Christmas Page Visitors" audience
- [ ] Launch first retargeting campaign ($10/day test)
- [ ] Monitor in Events Manager

**This Month:**
- [ ] Analyze which funnels convert best
- [ ] Create lookalike audiences (if 100+ conversions)
- [ ] Scale winning campaigns
- [ ] Test different ad creatives

---

## 💡 Pro Tips for Book Sales

### **Best Performing Audiences (typically):**
1. **Amazon clickers** within 3-7 days (warmest)
2. **Grandparents page** visitors (gift-givers)
3. **Christmas page** visitors November-December
4. **Deep engagement** (75%+ scroll)

### **Best Performing Ad Types:**
1. **Carousel ads** - Show multiple books/benefits
2. **Video ads** - Book trailer or flip-through
3. **Collection ads** - Showcase book + reviews
4. **Image ads** - Book cover + strong copy

### **Best Messaging:**
1. **Gift-giving angle** (especially grandparents)
2. **Biblical values** (resonates with target audience)
3. **Age-appropriate** (9-13 years old)
4. **Free preview** (low barrier entry)

---

## 🎯 Advanced: Custom Conversions

### **Create Custom Conversion for Amazon Clicks:**

1. Go to **Events Manager** → **Custom Conversions**
2. Click **Create Custom Conversion**
3. Set rules:
   - **Event:** InitiateCheckout
   - **URL Contains:** `/christmas-gift` (or any funnel page)
4. Name it: "Christmas Page - Amazon Click"
5. Set value: $15.99 (book price)

**Use this to:**
- Optimize campaigns for Amazon clicks
- Track ROAS (Return on Ad Spend)
- Compare performance across funnels

---

## 📱 Sample Audiences You Should Create

### **1. "Hot Leads" - High Intent**
```
Rules:
- InitiateCheckout in last 14 days
- OR DeepEngagement in last 7 days
- Exclude: Lead event (already signed up)

Estimated Size: Small but valuable
Best Use: Aggressive retargeting, higher bids
```

### **2. "Warm Prospects" - Interested**
```
Rules:
- ViewContent in last 30 days
- Time on page > 30 seconds
- Exclude: InitiateCheckout

Estimated Size: Medium
Best Use: Education, free preview offers
```

### **3. "Christmas Shoppers"**
```
Rules:
- URL Contains: /christmas-gift
- OR URL Contains: /grandparents
- Time: Last 45 days (start in November)

Estimated Size: Seasonal (grows in Nov-Dec)
Best Use: Gift-focused campaigns
```

### **4. "Newsletter Leads" - Nurture**
```
Rules:
- Lead event (newsletter signup)
- Time: Last 90 days

Estimated Size: Growing
Best Use: Book launch announcements, new releases
```

---

## 🎨 Retargeting Ad Examples

### **Ad #1: Direct Amazon Retarget**
```
Headline: Still Thinking About Cat Luker?
Primary Text: You showed interest in this magical adventure! 
Cat Luker combines time-travel excitement with biblical lessons - 
perfect for ages 9-13. 

✨ 880L Reading Level
📚 Beautifully illustrated
✝️ Biblical themes of courage & faith

CTA: Shop Now
Destination: Amazon link
```

### **Ad #2: Free Preview Hook**
```
Headline: Read the First Chapter FREE
Primary Text: Not sure yet? Download the first 22 pages 
plus a FREE Bible Study Guide - no purchase required!

Perfect for deciding if it's right for your child, 
grandchild, or youth group.

CTA: Get Free Preview
Destination: /christmas-gift (modal auto-open)
```

### **Ad #3: Social Proof**
```
Headline: Why Grandparents Love This Gift
Primary Text: "My grandson couldn't put it down! 
The biblical lessons are woven in so naturally."

Join hundreds of families discovering Cat Luker's 
magical adventure this Christmas.

🎄 Perfect for ages 9-13
📖 Faith-building stories
❤️ Memories that last

CTA: Learn More
Destination: /grandparents
```

---

## 📊 Expected Results

### **Good Benchmarks:**
- **CTR (Click-Through Rate):** 1-3%
- **CPC (Cost Per Click):** $0.50 - $2.00
- **Cost Per Amazon Click:** $3 - $8
- **Conversion Rate (Page → Amazon):** 5-15%

### **If you see:**
- **CTR < 1%** → Improve ad creative/copy
- **CPC > $2** → Audience too broad or saturated
- **Cost Per Amazon Click > $10** → Pause and optimize

---

## 🎯 Next-Level: Dynamic Ads

**Once you have traffic:**

1. **Product Catalog Setup** (advanced)
2. **Dynamic Product Ads** - Show exact book they viewed
3. **Automated Retargeting** - Facebook optimizes for you

---

## ⚠️ Common Mistakes to Avoid

1. ❌ **Too soon retargeting** - Wait at least 2 days
2. ❌ **No exclusions** - Don't retarget converters
3. ❌ **Audience too small** - Need 1,000+ for Facebook to optimize
4. ❌ **Same ad creative too long** - Refresh every 2 weeks
5. ❌ **No mobile optimization** - 70%+ traffic is mobile

---

## 🎁 Black Friday / Cyber Monday Strategy

**November 20-30:**
```
Audience: All funnel visitors (30 days)
Message: "Black Friday Special - 20% off with code!"
Budget: $100/day
```

**Create urgency with countdown timers in ads!**

---

## 📞 Getting Help

### **Facebook Pixel Not Firing:**
1. Check `.env.local` has correct Pixel ID
2. Verify Pixel Helper shows green checkmark
3. Check browser console for errors
4. Disable ad blockers when testing

### **Events Not Showing in Events Manager:**
1. Wait 20 minutes (events can be delayed)
2. Use Test Events tab for real-time
3. Verify Pixel Helper shows specific events
4. Check event parameters are included

### **Low Audience Size:**
1. Expand time window (30 → 60 days)
2. Combine multiple funnel pages
3. Use "OR" rules instead of "AND"
4. Wait for more traffic before creating lookalikes

---

**Your Meta Pixel Status:** ⚠️ Ready (needs Pixel ID)
**Implementation Date:** November 2025
**Next Step:** Add your Pixel ID and deploy!

🎯 Once deployed, you'll be able to retarget everyone who visits your funnel pages!

