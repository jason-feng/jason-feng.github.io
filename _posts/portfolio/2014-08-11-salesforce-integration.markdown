---
title: Waterfall Salesforce Integration
subtitle: Send SMS directly from Salesforce
type: Cross-platform data integration
layout: project
date: 2014-08-11
img: salesforce-integration/sendSMSContact.png
thumbnail: salesforce-integration/thumbnail.png
alt: image-alt
project-date: Summer 2014
client: Waterfall
category: portfolio
link: http://www.waterfall.com/is/salesforce/
published: false
---

### Project Goal: Establish a two-way integration between  Salesforce and Waterfall platform to provide Waterfall  functionality independent from the web application

##### Salesforce to Waterfall

* Send Individual SMS to Salesforce Contacts and Group SMS to  Salesforce Account
* View messaging history within Salesforce

##### Waterfall to Salesforce

* Import Waterfall contacts from list or campaign into Salesforce
* Continuously check for updates to Waterfall contacts and add in real time to Salesforce

#### Example Use Cases

##### Coca-Cola Enterprises - Beverage Distributors

* Send SMS to truckers sorted by different regions
* Communicate with vendors with expiring contracts
* Update vendors about new products and changes
* Clear parallel to Anheuser-Busch
* [Twilio Coca-Cola SMS](https://www.twilio.com/customers/stories/coca-cola)

##### Taco Bell - Franchises

* Update all franchises with new product information
* Reminders for marketing campaigns
* Changes in product arrivals, shipment changes

##### Lead Generation
* Generate leads from prospects within Salesforce using SMS for a more engaging platform


#### Technology Architecture

The general architecture of the integration works like this: There is code on the Salesforce client that lives within a Salesforce "custom button". Once the button is clicked, a Visualforce Page, essentially an HTML page is served. After typing in your message, this triggers an Apex Class (you can think of this like javascript) which will access the Waterfall REST API and provide the correct payload. On the Waterfall server, there exists EventListeners that constantly look for new subscriber updates. When these new subscribers join a Waterfall campaign, they are automatically added to an AWS Simple Queue. Server code is automatically triggered that adds that data to Salesforce as a new contat through the Salesforce API.


![Salesforce to Waterfall Architecture](/img/portfolio/salesforce-integration/salesforce-waterfall-architecture.png)

![Waterfall to Salesforce Architecture](/img/portfolio/salesforce-integration/waterfall-salesforce-architecture.png)

#### Code Snippets

<pre><code>
/*
 * A group message class linked to Salesforce Accounts.
 * This functions in the same way sending single messages do.
 *
 * Author: Jason Feng
 * Date: 8/29/31
 * Contact: jason@waterfall.com
 *
 */
public class waterfallSendBatchMessage {

  private final Account account;
    public String message {get; set;} // Get/set from Visualforce Page
    public String PhoneNumber {get; set;}
    private String auth_key ; // Using Perm Token Instead of Cookies because No Cookie Support
    private String filterURL = 'https://api.waterfall.com/api/v1/filter';
    private String broadcastURl = 'http://api.waterfall.com/api/v2/broadcast';

    /*
     * Constructor
     * @param stdController
     *
     */
    public waterfallSendBatchMessage(ApexPages.StandardController stdController) {
        this.account = (Account)stdController.getRecord();
        WaterfallConfig__c waterfallCfg = WaterfallConfig__c.getOrgDefaults();
        if (waterfallCfg==null)    {
            throw new waterfallException('Please enter your Waterfall account credentials under Waterfall Config custom settings (go to Setup | Develop | Custom Settings | Manage Waterfall Config)');
        }
        else {
            this.auth_key = waterfallCfg.AuthToken__c;
        }
    }

    /*
     * Creates the JSON Payload for the filter Method
     * @param ListID - ListID to filter on
     * @return payload
     */
    public String getFilterPayload(String ListID) {
        String metadataID = '4ec0a3dc0364de64869d93c2';
        // Create a JSONGenerator object.
        // Pass true to the constructor for pretty print formatting.
        JSONGenerator gen = JSON.createGenerator(true);
        // Write data to the JSON string.
        gen.writeStartObject();
        gen.writeFieldName('queryFilterDetails');
        gen.writeStartArray();
        gen.writeEndArray();
        gen.writeFieldName('lists');
        gen.writeStartArray();
        gen.writeString(ListID);
        gen.writeEndArray();
        gen.writeEndObject();
        gen.close();
        // Get the JSON string.
        String data = gen.getAsString();
        system.debug(data);
        return data;
    }

    /*
     * Filter API
     * @param filterPayload
     * return filterID
     */
    public String filter(String filterPayload) {
        String filterID;
        Http http=new Http();
     HttpRequest req=new HttpRequest();
     req.setEndpoint(filterURL);
     req.setHeader('Content-Type', 'application/json');
        req.setHeader('Accept', 'application/json');
        req.setHeader('Authorization', auth_key);
        req.setBody(filterPayload);
     req.setMethod('POST'); //you can also SET method `GET` with Get there is no need of req1.setbody()
        HttpResponse res;
        res = http.send(req);
        System.debug(res.getBody());
        JSONParser parser = JSON.createParser(res.getBody());
        while (parser.nextToken() != null) {
            if ((parser.getCurrentToken() == JSONToken.FIELD_NAME) &&
                (parser.getText() == 'id')) {
                // Get the value.
                parser.nextToken();
                // Compute the grand total price for all invoices.
                filterID = parser.getText();
                system.debug(parser.getText());
            }
        }
        return filterID;
    }
    /*
     * @paramfilterID
     * @param message - Message to send
     * @param currentDate - Time to send the broadcast, currently set to current time in ISO 8601 format
     * @return broadcastPayload
     */
    public String getBroadcastPayload(String filterID, String message, String currentDate) {
        String broadcastPayload;
        String channel = 'sms';
        JSONGenerator gen = JSON.createGenerator(true);
        gen.writeStartObject();
        gen.writeStringField('sendAt', currentDate);
        gen.writeFieldName('content');
        gen.writeStartArray();
        gen.writeStartObject();
        gen.writeStringField('channel', channel);
        gen.writeFieldName('audience');
        gen.writeStartArray();
        gen.writeString(filterID);
        gen.writeEndArray();
        gen.writeStringField('message', message);
        gen.writeEndObject();
        gen.writeEndArray();
    gen.writeEndObject();
        gen.close();
        // Get the JSON string.
        broadcastPayload = gen.getAsString();
        system.debug(broadcastPayload);
        return broadcastPayload;
    }
    /*
     * Broadcast API
     * @param broadcastPayload
     * @return resPayload
     */
    public String broadcast(String broadcastPayload) {
        String resPayload;
        Http http=new Http();
     HttpRequest req=new HttpRequest();
        HttpResponse res;
     req.setEndpoint(broadcastURL);
     req.setHeader('Content-Type', 'application/json');
        req.setHeader('Accept', 'application/json');
        req.setHeader('Authorization', auth_key);
        req.setBody(broadcastPayload);
     req.setMethod('POST'); //you can also SET method `GET` with Get there is no need of req.setbody()
        res = http.send(req);
        System.debug(res.getBody());
        resPayload = res.getBody();
        return resPayload;
    }

    /*
     * PageReference function linked to Visualforce Pages
     * Gets Account information from the account selected
     * Gets Message text body
     * @return null
     */
    public PageReference sendMessage() {
        String ListID = account.ListID__c;
        String currentTime = datetime.now().format('yyyy-MM-dd\'T\'HH:mm:ss.SSSSSSZ');
        String filterPayload = '';
        String broadcastPayload = '';
        String filterID ='';

        filterPayload = getFilterPayload(ListID);
         filterID = filter(filterPayload);
        broadcastPayload = getBroadcastPayload(filterID, message, currentTime);
        broadcast(broadcastPayload);
        return null;
    }
}
</code></pre>
