<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Cache-Control: no-cache");

$servername = "localhost";
$username = "root";
$password = "";
$datab = "teashopdb";
$conn = new mysqli($servername, $username, $password, $datab);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

function handle_error($code, $message) {
    $response["status"] = false;
    $response["error"]["code"] = $code;
    $response["error"]["message"] = $message;
    echo json_encode($response);
    exit;
}

function is_json($string) {
    json_decode($string);
    return (json_last_error() == JSON_ERROR_NONE);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $input = file_get_contents('php://input');
    
    if (!is_json($input)) {
        handle_error(106, "Invalid JSON format");
    }

    $data = json_decode($input);

    if (isset($data->action)) {
        $action = $data->action;

        switch ($action) {
            case 'register':
            case 'addStudent':
                $controller = new StudentController();
                break;
            case 'editStudent':
                $controller = new StudentController();
                break;
            case 'delStudent':
                $controller = new StudentController();
                break;
            default:
                $controller = new UserController();
                break;
        }
        echo "Connected";

        // $response = $controller->handleRequest($action, (array) $data);
        // echo json_encode($response);
    }
    $response = array('success' => true, 'message' => 'Connected to the Base', 'type' => 'student');
    echo json_encode($response);
} else {
    http_response_code(403);
    echo "Requested resource is forbidden";
}

class StudentController
{

    public function handleRequest($action, $data)
    {
        switch ($action) {
            case 'addStudent':
                return $this->add($data);
            case 'delStudent':
                return $this->delete($data);
            case 'editStudent':
                return $this->edit($data);
            default:
                return ['success' => false, 'message' => '$action', 'type' => 'student'];
        }
    }

    public function add($data2)
    {
        $conn = mysqli_connect('localhost', 'root', '', 'projdb');
        $data = json_decode(file_get_contents('php://input'), true);
        // Get the form data
        $id = $data['id'];
        $groupname = $data['groupn'];
        $fname = $data['firstName'];
        $lname = $data['lastName'];
        $gender = $data['gender'];
        $birthday = date('Y-m-d', strtotime($data['birthday']));
        $checked = $data['status'];

        //Validation
        if (!$id || !is_numeric($id)) {
            return array('success' => false, 'message' => 'Error adding student: Invalid ID', 'type' => 'student');
        }
    
        if (!$groupname || !is_numeric($groupname) || $groupname < 1 || $groupname > 7) {
            return array('success' => false, 'message' => 'Error adding student: Invalid group number', 'type' => 'student');
        }
    
        if (!$fname || !preg_match('/^[a-zA-Z]+$/', $fname)) {
            return array('success' => false, 'message' => 'Error adding student: Invalid first name', 'type' => 'student');
        }
    
        if (!$lname || !preg_match('/^[a-zA-Z]+$/', $lname)) {
            return array('success' => false, 'message' => 'Error adding student: Invalid last name', 'type' => 'student');
        }
    
        if (!$gender || !in_array($gender, array(1, 2))) {
            return array('success' => false, 'message' => 'Error adding student: Invalid gender', 'type' => 'student');
        }

        // Insert the student into the database
        $sql = "INSERT INTO students (id, group_id, firstName, lastName, gender_id, birthday_Data, status_id) VALUES ('$id', '$groupname', '$fname', '$lname', '$gender', '$birthday', '$checked')";
        if ($conn->query($sql) === TRUE) {
            // Return success message
            $response = array('success' => true, 'message' => 'Student added successfully.', 'type' => 'student');
        } else {
            $response = array('success' => false, 'message' => 'Error adding student: ' . mysqli_error($conn), 'type' => 'student');
        }

        return $response;
    }

    public function edit($data2)
    {

        $conn = mysqli_connect('localhost', 'root', '', 'projdb');
        $data = json_decode(file_get_contents('php://input'), true);
        // Get the form data
        $id = $data['id'];
        $groupname = $data['groupn'];
        $fname = $data['firstName'];
        $lname = $data['lastName'];
        $gender = $data['gender'];
        $birthday = date('Y-m-d', strtotime($data['birthday']));
        $checked = $data['status'];

        //Validation
        if (!$id || !is_numeric($id)) {
            return array('success' => false, 'message' => 'Error adding student: Invalid ID', 'type' => 'student');
        }
    
        if (!$groupname || !is_numeric($groupname) || $groupname < 1 || $groupname > 7) {
            return array('success' => false, 'message' => 'Error adding student: Invalid group number', 'type' => 'student');
        }
    
        if (!$fname || !preg_match('/^[a-zA-Z]+$/', $fname)) {
            return array('success' => false, 'message' => 'Error adding student: Invalid first name', 'type' => 'student');
        }
    
        if (!$lname || !preg_match('/^[a-zA-Z]+$/', $lname)) {
            return array('success' => false, 'message' => 'Error adding student: Invalid last name', 'type' => 'student');
        }
    
        if (!$gender || !in_array($gender, array(1, 2))) {
            return array('success' => false, 'message' => 'Error adding student: Invalid gender', 'type' => 'student');
        }

        $sql = "REPLACE INTO students VALUES ('$id', '$groupname', '$fname', '$lname', '$gender', '$birthday', '$checked')";
        if ($conn->query($sql) === TRUE) {
            $response = array('success' => true, 'message' => 'Student updated successfully.', 'type' => 'student');
        } else {
            $response = array('success' => false, 'message' => 'Error updating student: ' . mysqli_error($conn), 'type' => 'student');
        }

        return $response;
    }

    public function delete($data)
    {
        $conn = mysqli_connect('localhost', 'root', '', 'projdb');
        $data = json_decode(file_get_contents('php://input'), true);

        $id = $data['id'];

        // Delete the student from the database
        $sql = "DELETE FROM students WHERE id = '$id'";
        if (mysqli_query($conn, $sql)) {
            // Return success message
            $response = array('success' => true, 'message' => 'Student deleted successfully.', 'type' => 'student');
        } else {
            $response = array('success' => false, 'message' => 'Error deleting student: ' . mysqli_error($conn), 'type' => 'student');
        }

        return $response;
    }
}
?>