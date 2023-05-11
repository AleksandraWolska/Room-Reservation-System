package com.reservation.RoomReservation.Repositories.Mocks;

import com.reservation.RoomReservation.Models.Room;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Repository
public class RoomRepository implements com.reservation.RoomReservation.Repositories.RoomRepository {
    @Override
    public Optional<Room> findByNumberInBuilding(Integer number, String buildingName) {
        return Optional.empty();
    }

    @Override
    public List<Room> findByBuilding(String buildingName) {
        return null;
    }

    @Override
    public void flush() {

    }

    @Override
    public <S extends Room> S saveAndFlush(S entity) {
        return null;
    }

    @Override
    public <S extends Room> List<S> saveAllAndFlush(Iterable<S> entities) {
        return null;
    }

    @Override
    public void deleteAllInBatch(Iterable<Room> entities) {

    }

    @Override
    public void deleteAllByIdInBatch(Iterable<Integer> integers) {

    }

    @Override
    public void deleteAllInBatch() {

    }

    @Override
    public Room getOne(Integer integer) {
        return null;
    }

    @Override
    public Room getById(Integer integer) {
        return null;
    }

    @Override
    public Room getReferenceById(Integer integer) {
        return null;
    }

    @Override
    public <S extends Room> Optional<S> findOne(Example<S> example) {
        return Optional.empty();
    }

    @Override
    public <S extends Room> List<S> findAll(Example<S> example) {
        return null;
    }

    @Override
    public <S extends Room> List<S> findAll(Example<S> example, Sort sort) {
        return null;
    }

    @Override
    public <S extends Room> Page<S> findAll(Example<S> example, Pageable pageable) {
        return null;
    }

    @Override
    public <S extends Room> long count(Example<S> example) {
        return 0;
    }

    @Override
    public <S extends Room> boolean exists(Example<S> example) {
        return false;
    }

    @Override
    public <S extends Room, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
        return null;
    }

    @Override
    public <S extends Room> S save(S entity) {
        return null;
    }

    @Override
    public <S extends Room> List<S> saveAll(Iterable<S> entities) {
        return null;
    }

    @Override
    public Optional<Room> findById(Integer integer) {
        return Optional.empty();
    }

    @Override
    public boolean existsById(Integer integer) {
        return false;
    }

    @Override
    public List<Room> findAll() {
        return null;
    }

    @Override
    public List<Room> findAllById(Iterable<Integer> integers) {
        return null;
    }

    @Override
    public long count() {
        return 0;
    }

    @Override
    public void deleteById(Integer integer) {

    }

    @Override
    public void delete(Room entity) {

    }

    @Override
    public void deleteAllById(Iterable<? extends Integer> integers) {

    }

    @Override
    public void deleteAll(Iterable<? extends Room> entities) {

    }

    @Override
    public void deleteAll() {

    }

    @Override
    public List<Room> findAll(Sort sort) {
        return null;
    }

    @Override
    public Page<Room> findAll(Pageable pageable) {
        return null;
    }
}
