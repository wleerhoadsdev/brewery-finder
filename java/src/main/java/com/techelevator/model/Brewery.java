package com.techelevator.model;

public class Brewery {
    private Integer breweryId;
    private int breweryOwnerUserId;
    private String name;
    private boolean isActive;
    private boolean isApproved;
    private String history;
    private String hoursOfOperation;
    private Address address;
    private String phoneNumber;
    private String emailAddress;
    private String homePageUrl;
    private String imageUrl;

    public Brewery() {
    }
    public Brewery(Brewery breweryToCopyFrom) {
        this.breweryId = breweryToCopyFrom.getBreweryId();
        this.breweryOwnerUserId = breweryToCopyFrom.getBreweryOwnerUserId();
        this.name = breweryToCopyFrom.getName();
        this.isActive = breweryToCopyFrom.getIsActive();
        this.isApproved = breweryToCopyFrom.isApproved;
        this.history = breweryToCopyFrom.history;
        this.hoursOfOperation = breweryToCopyFrom.getHoursOfOperation();
        this.address = new Address(breweryToCopyFrom.getAddress());
        this.phoneNumber = breweryToCopyFrom.getPhoneNumber();
        this.emailAddress = breweryToCopyFrom.getEmailAddress();
        this.homePageUrl = breweryToCopyFrom.getHomePageUrl();
        this.imageUrl = breweryToCopyFrom.getImageUrl();
    }


    //    for testing purpose
    public Brewery(Integer breweryId, int breweryOwnerUserId, String name, boolean isActive, boolean isApproved,
                   String history, String hoursOfOperation, Address address, String phoneNumber,
                   String emailAddress, String homePageUrl, String imageUrl) {
        this.breweryId = breweryId;
        this.breweryOwnerUserId = breweryOwnerUserId;
        this.name = name;
        this.isActive = isActive;
        this.isApproved = isApproved;
        this.history = history;
        this.hoursOfOperation = hoursOfOperation;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.emailAddress = emailAddress;
        this.homePageUrl = homePageUrl;
        this.imageUrl = imageUrl;
    }

    //    for testing purpose
    public Brewery(int breweryOwnerUserId, String name, boolean isActive, boolean isApproved,
                   String history, String hoursOfOperation, Address address, String phoneNumber,
                   String emailAddress, String homePageUrl, String imageUrl) {
        this.breweryOwnerUserId = breweryOwnerUserId;
        this.name = name;
        this.isActive = isActive;
        this.isApproved = isApproved;
        this.history = history;
        this.hoursOfOperation = hoursOfOperation;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.emailAddress = emailAddress;
        this.homePageUrl = homePageUrl;
        this.imageUrl = imageUrl;
    }
//    for testing
    public Brewery(int i, int i1, String bbb, boolean b, boolean b1, String s, String s1, String street, String city, String state, String zipCode, String country, String s2, String s3, String s4, String s5) {
    }
// for testing
    public Brewery(int i, String bbb, boolean b, boolean b1, String s, String s1, String street, String city, String state, String zipCode, String country, String s2, String s3, String s4, String s5) {
    }

    public Integer getBreweryId() {
        return breweryId;
    }

    public void setBreweryId(Integer breweryId) {
        this.breweryId = breweryId;
    }

    public int getBreweryOwnerUserId() {
        return breweryOwnerUserId;
    }

    public void setBreweryOwnerUserId(int breweryOwnerUserId) {
        this.breweryOwnerUserId = breweryOwnerUserId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(boolean isActive) {
        this.isActive = isActive;
    }

    public boolean getIsApproved() {
        return isApproved;
    }

    public void setIsApproved(boolean isApproved) {
        this.isApproved = isApproved;
    }

    public String getHistory() {
        return history;
    }

    public void setHistory(String history) {
        this.history = history;
    }

    public String getHoursOfOperation() {
        return hoursOfOperation;
    }

    public void setHoursOfOperation(String hoursOfOperation) {
        this.hoursOfOperation = hoursOfOperation;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getHomePageUrl() {
        return homePageUrl;
    }

    public void setHomePageUrl(String homePageUrl) {
        this.homePageUrl = homePageUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}