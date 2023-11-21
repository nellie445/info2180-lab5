<?php
$host = 'localhost';
$username = 'lab5_user';
$password = 'password123';
$dbname = 'world';

$conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
$stmt = $conn->query("SELECT * FROM countries");

// Check if the country is provided in the GET request
if (isset($_GET['country'])) {
  $countryName = $_GET['country'];

  // Use prepared statements to prevent SQL injection
  $stmt = $conn->prepare("SELECT * FROM countries WHERE name = :country");
  $stmt->bindParam(':country', $countryName, PDO::PARAM_STR);
  $stmt->execute();

  // Fetch the result as an associative array
  $result = $stmt->fetch(PDO::FETCH_ASSOC);

  // Output the result as HTML
  if ($result) {
      echo formatResult($result);
  } else {
      echo '<p>Error: Country not found</p>';
  }
} else {
  echo '<p>Error: No country provided</p>';
}


$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

?>
<ul>
<?php foreach ($results as $row): ?>
  <li><?= $row['name'] . ' is ruled by ' . $row['head_of_state']; ?></li>
<?php endforeach; ?>
</ul>
<?php
function formatResult($data) {
    // Define your formatting logic here
    return '
        <p>Country: ' . $data['name'] . '</p>
        <p>Head of State: ' . $data['head_of_state'] . '</p>
        <p>Population: ' . $data['population'] . '</p>
        <p>Independence Year: ' . $data['independence_year'] . '</p>
        <p>Government Form: ' . $data['government_form'] . '</p>
        <p>Head of State: ' . $data['head_of_state'] . '</p>
    ';
}
?>


