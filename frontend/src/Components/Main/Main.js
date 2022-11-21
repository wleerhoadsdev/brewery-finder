import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Home from '../Home/Home';
import Navbar from '../Navbar/Navbar';
import AddBeer from '../AddBeer/AddBeer';
import AddBrewery from '../AddBrewery/AddBrewery';
import AddReview from '../AddReview/AddReview';
import EditBrewery from '../EditBrewery/EditBrewery';
import ViewAllBreweries from '../ViewAllBreweries/ViewAllBreweries';
import ViewAllUsers from '../ViewAllUsers/ViewAllUsers';
import ViewBeerInformation from '../ViewBeerInformation/ViewBeerInformation';
import ViewBeerList from '../ViewBeerList/ViewBeerList';
import ViewBrewery from '../ViewBrewery/ViewBrewery';
import { useEffect } from 'react';
import AuthService from '../../services/auth.service';
import BeerService from '../../services/beer.service';

export default function Main(props) {
    const [token, setToken] = useState('');
    const [user, setUser] = useState();
    const [currentBrewery, setCurrentBrewery] = useState('');
    const [currentBeer, setCurrentBeer] = useState('');
    const [myBrewery, setMyBrewery] = useState('');
    const [editBreweryData, setEditBreweryData] = useState({});
    const [beerTypes, setBeerTypes] = useState();

    useEffect(() => {
        handleGetBeerTypes();
        handleCheckSessionStorage();
    }, []);

    const handleLogout = () => {
        AuthService.logout();
        setToken('');
        setUser();
        setCurrentBrewery('');
        setMyBrewery('');
        setCurrentBeer('');
        handleEditBreweryData('');
    };

    const handleToken = (token) => {
        setToken(token);
    };

    const handleUser = (user) => {
        setUser(user);
    };

    const handleCheckSessionStorage = () => {
        if (AuthService.getCurrentToken) {
            setToken(AuthService.getCurrentToken);
            setUser(AuthService.getCurrentUser);
        }
    };

    const handleCurrentBrewery = (breweryId) => {
        setCurrentBrewery(breweryId);
    };

    const handleMyBrewery = (breweryId) => {
        setMyBrewery(breweryId);
    };

    const handleEditBreweryData = (breweryData) => {
        setEditBreweryData(breweryData);
    };

    const handleGetBeerTypes = () => {
        BeerService.fetchBeerTypes(setBeerTypes);
    };

    return (
        <div>
            <Navbar
                user={user}
                handleLogout={handleLogout}
            />
            <Routes>
                <Route
                    path='/login'
                    element={
                        <Login
                            handleToken={handleToken}
                            handleUser={handleUser}
                        />
                    }
                />
                <Route
                    path='/register'
                    element={<Register />}
                />
                <Route
                    path='/brewery/:breweryId/addbeer'
                    element={
                        <AddBeer
                            user={user}
                            token={token}
                            brewery={currentBrewery}
                            beerTypes={beerTypes}
                        />
                    }
                />
                <Route
                    path='/users/:userId/addbrewery'
                    element={
                        <AddBrewery
                            user={user}
                            token={token}
                        />
                    }
                />
                <Route
                    path='/brewery/:breweryId/beer/:beerId/addreview'
                    element={<AddReview user={user} />}
                />
                <Route
                    path='/brewery/:breweryId/editbrewery'
                    element={
                        <EditBrewery
                            user={user}
                            token={token}
                            brewery={currentBrewery}
                            breweryData={editBreweryData}
                        />
                    }
                />
                <Route
                    path='/breweries'
                    element={
                        <ViewAllBreweries
                            user={user}
                            token={token}
                            handleCurrentBrewery={handleCurrentBrewery}
                            myBrewery={myBrewery}
                            brewery={currentBrewery}
                        />
                    }
                />
                <Route
                    path='/users'
                    element={
                        <ViewAllUsers
                            user={user}
                            token={token}
                        />
                    }
                />
                <Route
                    path='/brewery/:breweryId/beers/:beerId'
                    element={
                        <ViewBeerInformation
                            user={user}
                            token={token}
                            brewery={currentBrewery}
                            beer={currentBeer}
                            beerTypes={beerTypes}
                        />
                    }
                />
                <Route
                    path='/brewery/:breweryId/beers'
                    element={
                        <ViewBeerList
                            user={user}
                            token={token}
                            brewery={currentBrewery}
                            myBrewery={myBrewery}
                            beerTypes={beerTypes}
                        />
                    }
                />
                <Route
                    path='/brewery/:breweryId'
                    element={
                        <ViewBrewery
                            user={user}
                            token={token}
                            brewery={currentBrewery}
                            myBrewery={myBrewery}
                            handleEditBreweryData={handleEditBreweryData}
                        />
                    }
                />
                <Route
                    path='/'
                    element={
                        <Home
                            user={user}
                            token={token}
                            myBrewery={myBrewery}
                            handleMyBrewery={handleMyBrewery}
                        />
                    }
                />
            </Routes>
        </div>
    );
}
