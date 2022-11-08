package com.techelevator.model;

public class Beer {

    private int beerId;
    private int breweryId;
    private String name;
    private String description;
    private String imageUrl;
    private Double adv;
    private int typeId;
    private boolean isActive;

    public int getBeerId() {
        return beerId;
    }

    public void setBeerId(int beerId) {
        this.beerId = beerId;
    }

    public int getBreweryId() {
        return breweryId;
    }

    public void setBreweryId(int breweryId) {
        this.breweryId = breweryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Double getAdv() {
        return adv;
    }

    public void setAdv(Double adv) {
        this.adv = adv;
    }

    public int getTypeId() {
        return typeId;
    }

    public void setTypeId(int typeId) {
        typeId = typeId;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }
}