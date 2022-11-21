package com.techelevator.model;

public class BreweryListItem {
    private int id;
    private String name;
    private Address address;
    private boolean isActive;
    private String homePageUrl;

    public String getHomePageUrl() {
        return homePageUrl;
    }

    public void setHomePageUrl(String homePageUrl) {
        this.homePageUrl = homePageUrl;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean getIsActive() { return isActive; }

    public void setIsActive(boolean isActive) { this.isActive = isActive; }



}