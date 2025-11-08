-- Sample Data for College Management System
-- Run this after schema.sql

USE college_management;

-- Insert Departments
INSERT INTO departments (dept_id, dept_name) VALUES
('CSE', 'Computer Science & Engineering'),
('ECE', 'Electronics & Communication Engineering'),
('ME', 'Mechanical Engineering'),
('CE', 'Civil Engineering'),
('EE', 'Electrical Engineering');

-- Insert Faculty
INSERT INTO faculty (name, department, email, phone) VALUES
('Dr. Rajesh Kumar', 'CSE', 'rajesh.kumar@college.edu', '9876543210'),
('Dr. Priya Sharma', 'CSE', 'priya.sharma@college.edu', '9876543211'),
('Dr. Amit Patel', 'ECE', 'amit.patel@college.edu', '9876543212'),
('Dr. Sunita Reddy', 'ECE', 'sunita.reddy@college.edu', '9876543213'),
('Dr. Vikram Singh', 'ME', 'vikram.singh@college.edu', '9876543214'),
('Dr. Anjali Verma', 'CE', 'anjali.verma@college.edu', '9876543215');

-- Insert Students
INSERT INTO students (name, roll_no, email, dept_id, dob, phone) VALUES
('Alice Johnson', '2023001', 'alice.johnson@student.edu', 'CSE', '2004-05-12', '9876500001'),
('Bob Smith', '2023002', 'bob.smith@student.edu', 'CSE', '2003-11-03', '9876500002'),
('Charlie Brown', '2023003', 'charlie.brown@student.edu', 'ECE', '2004-02-15', '9876500003'),
('Diana Prince', '2023004', 'diana.prince@student.edu', 'ECE', '2003-08-20', '9876500004'),
('Ethan Hunt', '2023005', 'ethan.hunt@student.edu', 'ME', '2004-01-10', '9876500005'),
('Fiona Green', '2023006', 'fiona.green@student.edu', 'CE', '2003-12-25', '9876500006'),
('George Wilson', '2023007', 'george.wilson@student.edu', 'CSE', '2004-03-18', '9876500007'),
('Hannah Davis', '2023008', 'hannah.davis@student.edu', 'ECE', '2003-09-05', '9876500008');

-- Insert Courses
INSERT INTO courses (course_name, credits, faculty_id) VALUES
('Data Structures', 4, 1),
('Database Management Systems', 4, 1),
('Computer Networks', 3, 2),
('Digital Systems', 3, 3),
('Signal Processing', 4, 4),
('Thermodynamics', 3, 5),
('Structural Analysis', 4, 6),
('Operating Systems', 4, 2);

-- Insert Enrollments
INSERT INTO enrollments (student_id, course_id) VALUES
(1, 1),  -- Alice enrolled in Data Structures
(1, 2),  -- Alice enrolled in DBMS
(2, 1),  -- Bob enrolled in Data Structures
(2, 3),  -- Bob enrolled in Computer Networks
(3, 4),  -- Charlie enrolled in Digital Systems
(3, 5),  -- Charlie enrolled in Signal Processing
(4, 4),  -- Diana enrolled in Digital Systems
(4, 5),  -- Diana enrolled in Signal Processing
(5, 6),  -- Ethan enrolled in Thermodynamics
(6, 7),  -- Fiona enrolled in Structural Analysis
(7, 1),  -- George enrolled in Data Structures
(7, 8),  -- George enrolled in Operating Systems
(8, 4),  -- Hannah enrolled in Digital Systems
(8, 5);  -- Hannah enrolled in Signal Processing

