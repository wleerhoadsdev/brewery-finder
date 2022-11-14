package com.techelevator.dao;

import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.List;

import com.techelevator.dao.exception.RecordNotFoundException;
import com.techelevator.model.Authority;
import com.techelevator.model.UserBreweryListItem;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.techelevator.model.User;

@Service
public class JdbcUserDao implements UserDao {

    private static final String MESSAGE_FORMAT_USER_NOT_FOUND_EXCEPTION = "Could not find user with ID = %d.";
    private static final String MESSAGE_COULD_NOT_UPDATE_USER_RECORD = "Could not update user record.";

    private JdbcTemplate jdbcTemplate;

    public JdbcUserDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int findIdByUsername(String username) {
        return jdbcTemplate.queryForObject("select user_id from users where username = ?", int.class, username);
    }

	@Override
	public User getUserById(int userId) {
		String sql = "SELECT * FROM users WHERE user_id = ?";
		SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);
		if(results.next()) {
			return mapRowToUser(results);
		} else {
			throw new RecordNotFoundException(String.format(
                    MESSAGE_FORMAT_USER_NOT_FOUND_EXCEPTION, userId));
		}
	}

    @Override
    public List<User> findAll() {
        List<User> users = new ArrayList<>();
        String sql = "select * from users";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
        while(results.next()) {
            User user = mapRowToUser(results);
            users.add(user);
        }

        return users;
    }

    @Override
    public User findByUsername(String username) throws UsernameNotFoundException {
        for (User user : this.findAll()) {
            if( user.getUsername().toLowerCase().equals(username.toLowerCase())) {
                return user;
            }
        }
        throw new UsernameNotFoundException("User " + username + " was not found.");
    }

    @Override
    public boolean create(String username, String password, String role, String name, String emailAddress) {
        boolean userCreated = false;

        // create user
        String insertUser = "insert into users (username,password_hash,role,name,email_address) values(?,?,?,?,?)";
        String password_hash = new BCryptPasswordEncoder().encode(password);
        String ssRole = "ROLE_" + role.toUpperCase();

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        String id_column = "user_id";
        userCreated = jdbcTemplate.update(con -> {
                    PreparedStatement ps = con.prepareStatement(insertUser, new String[]{id_column});
                    ps.setString(1, username);
                    ps.setString(2, password_hash);
                    ps.setString(3, ssRole);
                    ps.setString(4, name);
                    ps.setString(5, emailAddress);
                    return ps;
                }
                , keyHolder) == 1;
        int newUserId = (int) keyHolder.getKeys().get(id_column);

        return userCreated;
    }

    @Override
    public List<UserBreweryListItem> listAllUsersAndTheirBreweries() {
        List<UserBreweryListItem> listItems = new ArrayList<>();
        String sql =
            "SELECT user_id, username, users.name AS user_person_name, brewery.brewery_id AS brewery_id, brewery_name " +
            "FROM users " +
            "LEFT OUTER JOIN brewery ON brewery.brewery_owner_user_id = users.user_id " +
            "ORDER BY username, user_person_name, brewery_name;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
        while(results.next()) {
            UserBreweryListItem listItem = mapRowToUserBreweryListItem(results);
            listItems.add(listItem);
        }
        return listItems;
    }

    private UserBreweryListItem mapRowToUserBreweryListItem(SqlRowSet rs) {
        UserBreweryListItem listItem = new UserBreweryListItem();
        listItem.setUserId(rs.getInt("user_id"));
        listItem.setUsername(rs.getString("username"));
        listItem.setName(rs.getString("user_person_name"));
        int breweryId = rs.getInt("brewery_id");
        listItem.setBreweryId(breweryId == 0 ? null : breweryId);
        listItem.setBreweryName(rs.getString("brewery_name"));
        return listItem;
    }

    private User mapRowToUser(SqlRowSet rs) {
        User user = new User();
        user.setId(rs.getInt("user_id"));
        user.setUsername(rs.getString("username"));
        user.setPassword(rs.getString("password_hash"));
        user.setAuthorities(rs.getString("role"));
        user.setActivated(true);
        user.setName(rs.getString("name"));
        user.setEmailAddress(rs.getString("email_address"));
        return user;
    }

    @Override
    public User update(User user) {

        try {
            String sql =
                "UPDATE users SET " +
                    "username = ?, " +
                    "password_hash = ?, " +
                    "role = ?, " +
                    "name = ?, " +
                    "email_address = ? " +
                "WHERE user_id = ?;";

            String role = "";
            for (Authority authority : user.getAuthorities()) {
                if (!role.isEmpty()) {
                    role += ",";
                }
                role += authority.getName();
            }

            if (jdbcTemplate.update(sql,
                user.getUsername(),
                user.getPassword(),
                role,
                user.getName(),
                user.getEmailAddress(),
                user.getId()
            ) == 0) {
                throw new RecordNotFoundException(String.format(MESSAGE_FORMAT_USER_NOT_FOUND_EXCEPTION,
                        "user_id", user.getId()));
            }

            return user;
        } catch (DataAccessException e) {
            throw new RuntimeException(MESSAGE_COULD_NOT_UPDATE_USER_RECORD, e);
        }
    }
}