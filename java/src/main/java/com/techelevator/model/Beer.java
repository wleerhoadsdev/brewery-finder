package com.techelevator.model;

public class Beer {

    private int beerId;
    private int breweryId;
    private String name;
    private String description;
    private String imageUrl;
    private Double abv;
    private int typeId;
    private boolean isActive;

    public Beer(Beer beerToCopyFrom) {
        this.beerId = beerToCopyFrom.getBeerId();
        this.name = beerToCopyFrom.getName();
        this.breweryId = beerToCopyFrom.getBreweryId();
        this.description = beerToCopyFrom.getDescription();
        this.abv = beerToCopyFrom.getAbv();
        this.typeId = beerToCopyFrom.getTypeId();
        this.isActive = beerToCopyFrom.getIsActive();
        this.imageUrl = beerToCopyFrom.getImageUrl();
    }

    public Beer() {

    }

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

    public Double getAbv() {
        return abv;
    }

    public void setAbv(Double abv) {
        this.abv = abv;
    }

    public int getTypeId() {
        return typeId;
    }

    public void setTypeId(int typeId) {
        this.typeId = typeId;
    }

    public boolean getIsActive() {
        return isActive;
    }

    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }
}
