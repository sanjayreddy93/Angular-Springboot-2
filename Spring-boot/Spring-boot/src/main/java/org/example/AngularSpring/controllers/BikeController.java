package org.example.AngularSpring.controllers;

import org.example.AngularSpring.models.Bike;
import org.example.AngularSpring.repositories.BikeRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/bikes")
public class BikeController {
    @Autowired
    private BikeRepository bikeRepository;

    @RequestMapping(method = RequestMethod.GET)
    public List<Bike> getAllBikes(){
        return bikeRepository.findAll();
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public Optional<Bike> getBikeById(@PathVariable BigInteger id){

        return bikeRepository.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public Bike createBike(@RequestBody final Bike bike){

        return bikeRepository.saveAndFlush(bike);
    }
    
    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public Bike updateBikeById(@PathVariable BigInteger id, @RequestBody Bike bike){
        Bike currentBike = bikeRepository.getOne(id);
        BeanUtils.copyProperties(bike, currentBike, "id");
        return bikeRepository.saveAndFlush(currentBike);
    }
    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void deleteBikeById(@PathVariable BigInteger id) {
        bikeRepository.deleteById(id);
    }
}
