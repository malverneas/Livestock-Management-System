import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import { Text } from '../../components/typography/Text';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { MapPin, Phone, MessageCircle } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import { Stack } from 'expo-router';

const listings = [
  {
    id: '1',
    title: 'Brahman Bull',
    breed: 'Brahman',
    age: '3 years',
    weight: '750 kg',
    price: '$2,500',
    location: 'Harare, Zimbabwe',
    description: 'Healthy Brahman bull with excellent genetics. Perfect for breeding.',
    image: 'https://images.pexels.com/photos/735968/pexels-photo-735968.jpeg',
    seller: {
      name: 'John Smith',
      phone: '+263 77 123 4567',
    },
  },
  {
    id: '2',
    title: 'Mashona Heifer',
    breed: 'Mashona',
    age: '2 years',
    weight: '450 kg',
    price: '$1,800',
    location: 'Bulawayo, Zimbabwe',
    description: 'Pure Mashona heifer, ready for breeding. Good temperament.',
    image: 'https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg',
    seller: {
      name: 'Sarah Johnson',
      phone: '+263 77 987 6543',
    },
  },
];

const lostAndFound = [
  {
    id: '1',
    type: 'lost',
    tag: 'TAG123',
    lastSeen: '2024-02-15',
    location: 'Mazowe, Zimbabwe',
    description: 'Brown Brahman cow with white patches. Tag number TAG123.',
    image: 'https://images.pexels.com/photos/139923/pexels-photo-139923.jpeg',
    contact: {
      name: 'David Brown',
      phone: '+263 77 555 1234',
    },
  },
];

export default function MarketplaceScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Marketplace',
        }}
      />
      <MarketplaceContent />
    </>
  );
}

function MarketplaceContent() {
  const [activeTab, setActiveTab] = useState('buy');
  const [showBuyDropdown, setShowBuyDropdown] = useState(false);
  const [showSellDropdown, setShowSellDropdown] = useState(false);
  const [selectedBuyCategory, setSelectedBuyCategory] = useState('Livestock');
  const [selectedSellCategory, setSelectedSellCategory] = useState('Livestock');

  const handleOutsidePress = () => {
    setShowBuyDropdown(false);
    setShowSellDropdown(false);
  };

  const renderListingCard = (listing: typeof listings[0]) => (
    <Card key={listing.id} style={styles.listingCard}>
      <Image source={{ uri: listing.image }} style={styles.listingImage} />
      <View style={styles.listingContent}>
        <View style={styles.listingHeader}>
          <View>
            <Text variant="h5" weight="medium">
              {listing.title}
            </Text>
            <Text variant="body2" color="primary.500" style={styles.price}>
              {listing.price}
            </Text>
          </View>
          <Button variant="primary" size="sm">
            Contact
          </Button>
        </View>

        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Text variant="caption" color="neutral.600">
              Breed
            </Text>
            <Text variant="body2" weight="medium">
              {listing.breed}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text variant="caption" color="neutral.600">
              Age
            </Text>
            <Text variant="body2" weight="medium">
              {listing.age}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text variant="caption" color="neutral.600">
              Weight
            </Text>
            <Text variant="body2" weight="medium">
              {listing.weight}
            </Text>
          </View>
        </View>

        <Text variant="body2" color="neutral.600" style={styles.description}>
          {listing.description}
        </Text>

        <View style={styles.footer}>
          <View style={styles.locationContainer}>
            <MapPin size={16} color={Colors.neutral[600]} />
            <Text variant="caption" color="neutral.600" style={styles.location}>
              {listing.location}
            </Text>
          </View>
          <View style={styles.sellerInfo}>
            <Text variant="caption" color="neutral.600">
              Listed by {listing.seller.name}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );

  const renderLostFoundCard = (item: typeof lostAndFound[0]) => (
    <Card key={item.id} style={styles.lostFoundCard}>
      <View style={styles.lostFoundHeader}>
        <View
          style={[
            styles.statusBadge,
            item.type === 'lost' ? styles.lostBadge : styles.foundBadge,
          ]}
        >
          <Text
            variant="caption"
            weight="medium"
            color={item.type === 'lost' ? 'error.700' : 'success.700'}
          >
            {item.type.toUpperCase()}
          </Text>
        </View>
        <Text variant="caption" color="neutral.600">
          Last seen: {item.lastSeen}
        </Text>
      </View>

      <View style={styles.lostFoundContent}>
        <Image source={{ uri: item.image }} style={styles.lostFoundImage} />
        <View style={styles.lostFoundDetails}>
          <Text variant="h6" weight="medium">
            Tag: {item.tag}
          </Text>
          <Text variant="body2" color="neutral.600" style={styles.description}>
            {item.description}
          </Text>
          <View style={styles.locationContainer}>
            <MapPin size={16} color={Colors.neutral[600]} />
            <Text variant="caption" color="neutral.600" style={styles.location}>
              {item.location}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.contactButtons}>
        <Button
          variant="outline"
          size="sm"
          style={styles.contactButton}
          startIcon={<Phone size={16} color={Colors.primary[500]} />}
        >
          Call
        </Button>
        <Button
          variant="outline"
          size="sm"
          style={styles.contactButton}
          startIcon={<MessageCircle size={16} color={Colors.primary[500]} />}
        >
          Message
        </Button>
      </View>
    </Card>
  );

  return (
    <ScreenContainer style={styles.container}>
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={styles.tabs}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'buy' && styles.activeTab]}
              onPress={() => {
                setActiveTab('buy');
                setShowBuyDropdown(!showBuyDropdown);
                setShowSellDropdown(false);
              }}
            >
              <Text
                variant="body"
                weight={activeTab === 'buy' ? 'medium' : 'regular'}
                color={activeTab === 'buy' ? 'primary.500' : 'neutral.600'}
              >
                Buy {selectedBuyCategory}
              </Text>
            </TouchableOpacity>
            {showBuyDropdown && (
              <View style={styles.dropdown}>
                {['Livestock', 'Milk', 'Feed Products'].map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedBuyCategory(item);
                      setShowBuyDropdown(false);
                    }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'sell' && styles.activeTab]}
              onPress={() => {
                setActiveTab('sell');
                setShowSellDropdown(!showSellDropdown);
                setShowBuyDropdown(false);
              }}
            >
              <Text
                variant="body"
                weight={activeTab === 'sell' ? 'medium' : 'regular'}
                color={activeTab === 'sell' ? 'primary.500' : 'neutral.600'}
              >
                Sell {selectedSellCategory}
              </Text>
            </TouchableOpacity>
            {showSellDropdown && (
              <View style={styles.dropdown}>
                {['Livestock', 'Milk', 'Feed Products'].map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedSellCategory(item);
                      setShowSellDropdown(false);
                    }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'lost' && styles.activeTab]}
              onPress={() => {
                setActiveTab('lost');
                setShowBuyDropdown(false);
                setShowSellDropdown(false);
              }}
            >
              <Text
                variant="body"
                weight={activeTab === 'lost' ? 'medium' : 'regular'}
                color={activeTab === 'lost' ? 'primary.500' : 'neutral.600'}
              >
                Lost & Found
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <ScrollView style={styles.content}>
        {activeTab === 'buy' && (
          <>
            {selectedBuyCategory === 'Livestock' && listings.map(renderListingCard)}
            {selectedBuyCategory === 'Milk' && (
              <Card style={styles.sellCard}>
                <Text variant="h5" weight="medium" style={styles.sellTitle}>
                  Buy Milk Products
                </Text>
                <Text variant="body" color="neutral.600" style={styles.sellDescription}>
                  Browse available milk products from local farmers.
                </Text>
              </Card>
            )}
            {selectedBuyCategory === 'Feed Products' && (
              <Card style={styles.sellCard}>
                <Text variant="h5" weight="medium" style={styles.sellTitle}>
                  Buy Feed Products
                </Text>
                <Text variant="body" color="neutral.600" style={styles.sellDescription}>
                  Find quality feed products for your livestock.
                </Text>
              </Card>
            )}
          </>
        )}
        {activeTab === 'sell' && (
          <Card style={styles.sellCard}>
            <Text variant="h5" weight="medium" style={styles.sellTitle}>
              {selectedSellCategory === 'Livestock' && 'List Your Livestock'}
              {selectedSellCategory === 'Milk' && 'Sell Milk Products'}
              {selectedSellCategory === 'Feed Products' && 'Sell Feed Products'}
            </Text>
            <Text variant="body" color="neutral.600" style={styles.sellDescription}>
              {selectedSellCategory === 'Livestock' && 'Create a listing to sell your livestock. Include photos, details, and pricing.'}
              {selectedSellCategory === 'Milk' && 'List your milk products for sale. Include type, quantity, and pricing.'}
              {selectedSellCategory === 'Feed Products' && 'Sell your feed products. Include type, quantity, and pricing.'}
            </Text>
            <Button variant="primary" style={styles.sellButton}>
              {selectedSellCategory === 'Livestock' ? 'Create Livestock Listing' : 'Create Listing'}
            </Button>
          </Card>
        )}
        {activeTab === 'lost' && (
          <>
            <View style={styles.lostFoundActions}>
              <Button variant="primary" style={styles.actionButton}>
                Report Lost
              </Button>
              <Button variant="outline" style={styles.actionButton}>
                Report Found
              </Button>
            </View>
            {lostAndFound.map(renderLostFoundCard)}
          </>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
    marginBottom: 16,
    position: 'relative',
    zIndex: 1,
  },
  tabContainer: {
    flex: 1,
    position: 'relative',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary[500],
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 8,
    right: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
    marginTop: 4,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listingCard: {
    marginBottom: 16,
    overflow: 'hidden',
  },
  listingImage: {
    width: '100%',
    height: 200,
  },
  listingContent: {
    padding: 16,
  },
  listingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  price: {
    marginTop: 4,
  },
  detailsGrid: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  detailItem: {
    flex: 1,
  },
  description: {
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    marginLeft: 4,
  },
  sellerInfo: {
    alignItems: 'flex-end',
  },
  sellCard: {
    padding: 24,
    alignItems: 'center',
  },
  sellTitle: {
    marginBottom: 8,
  },
  sellDescription: {
    textAlign: 'center',
    marginBottom: 24,
  },
  sellButton: {
    minWidth: 200,
  },
  lostFoundActions: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
  },
  lostFoundCard: {
    marginBottom: 16,
  },
  lostFoundHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  lostBadge: {
    backgroundColor: Colors.error[100],
  },
  foundBadge: {
    backgroundColor: Colors.success[100],
  },
  lostFoundContent: {
    flexDirection: 'row',
    padding: 16,
  },
  lostFoundImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  lostFoundDetails: {
    flex: 1,
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 16,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
  },
  contactButton: {
    flex: 1,
  },
});