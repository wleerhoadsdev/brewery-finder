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
        this.isActive = breweryToCopyFrom.isActive();
        this.isApproved = breweryToCopyFrom.isApproved;
        this.history = breweryToCopyFrom.history;
        this.hoursOfOperation = breweryToCopyFrom.getHoursOfOperation();
        this.address = new Address(breweryToCopyFrom.getAddress());
        this.phoneNumber = breweryToCopyFrom.getPhoneNumber();
        this.emailAddress = breweryToCopyFrom.getEmailAddress();
        this.homePageUrl = breweryToCopyFrom.getHomePageUrl();
        this.imageUrl = breweryToCopyFrom.getImageUrl();
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

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public boolean isApproved() {
        return isApproved;
    }

    public void setApproved(boolean approved) {
        isApproved = approved;
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